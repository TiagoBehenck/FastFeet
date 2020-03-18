import { isAfter, parseISO, getHours } from 'date-fns';

import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/newDeliveryMail';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/Deliveryman';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { q: productName, page = 1 } = req.query;

    const deliveries = productName
      ? await Delivery.findAll({
          where: {
            product: {
              [Op.like]: `%${productName}%`,
            },
          },
          order: ['id'],
          attributes: [
            'id',
            'product',
            'status',
            'start_date',
            'canceled_at',
            'end_date',
          ],
          include: [
            {
              model: DeliveryMan,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              paranoid: false,
              attributes: [
                'id',
                'name',
                'street',
                'number',
                'compliment',
                'city',
                'state',
                'postal_code',
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['url', 'name', 'path'],
            },
          ],
        })
      : await Delivery.findAll({
          attributes: [
            'id',
            'product',
            'status',
            'start_date',
            'canceled_at',
            'end_date',
          ],
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
          include: [
            {
              model: DeliveryMan,
              as: 'deliveryman',
              attributes: ['name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['name', 'path', 'url'],
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'street',
                'number',
                'compliment',
                'state',
                'city',
                'postal_code',
              ],
            },
            {
              model: File,
              as: 'signature',
              attributes: ['url', 'name', 'path'],
            },
          ],
        });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { product, recipient_id, deliveryman_id } = req.body;

    const deliverymanExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const {
      id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    } = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
      status: 'PENDENTE',
    });

    await Queue.add(NewDeliveryMail.key, {
      deliverymanExists,
      recipient: recipientExists,
      product,
    });

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
      canceled_at,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    if (deliveryman_id) {
      const deliveryman = await DeliveryMan.findByPk(deliveryman_id);
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman not found' });
      }
    }

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);
      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found' });
      }
    }

    // if (signature_id) {
    //   const signature = await File.findByPk(signature_id);
    //   if (!signature) {
    //     return res.status(400).json({ error: 'Signature not found' });
    //   }
    // }

    const { start_date, end_date, canceled_at } = req.body;
    if (canceled_at) {
      return res.status(400).json({ error: 'Cancel date are not modifiable' });
    }

    const parsedStart = parseISO(start_date);
    const parsedEnd = parseISO(end_date);

    if (start_date) {
      const hour = getHours(parsedStart);
      if (hour < 8 || hour >= 18) {
        return res
          .status(400)
          .json({ error: 'Retrievs can be done only between 08:00 - 18:00h ' });
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        return res.status(400).json({ error: "The delivery hasn't started" });
      }
    }

    if (start_date && end_date) {
      if (isAfter(parsedStart, parsedEnd)) {
        return res
          .status(400)
          .json({ error: 'End date should be after the start' });
      }
    }

    await delivery.update(req.body);

    // await delivery.reload({
    //   attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
    //   include: [
    //     {
    //       model: DeliveryMan,
    //       as: 'deliveryman',
    //       attributes: ['name', 'email'],
    //       include: [
    //         {
    //           model: File,
    //           as: 'avatar',
    //           attributes: ['name', 'path', 'url'],
    //         },
    //       ],
    //     },
    //     {
    //       model: Recipient,
    //       as: 'recipient',
    //       attributes: [
    //         'name',
    //         'street',
    //         'number',
    //         'compliment',
    //         'state',
    //         'city',
    //         'postal_code',
    //       ],
    //     },
    //     {
    //       model: File,
    //       as: 'signature',
    //       attributes: ['url', 'name', 'path'],
    //     },
    //   ],
    // });

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'compliment',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ ok: true });
  }
}

export default new DeliveryController();
