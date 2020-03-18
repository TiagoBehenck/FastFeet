import { Op } from 'sequelize';

import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

class RecipientsController {
  async index(req, res) {
    const { q: recipientName, page = 1 } = req.query;

    const recipients = recipientName
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.like]: `%${recipientName}%`,
            },
          },
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
        })
      : await Recipient.findAll({
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
          limit: 5,
          offset: (page - 1) * 5,
        });

    return res.json(recipients);
  }

  async store(req, res) {
    const {
      name,
      street,
      number,
      compliment,
      state,
      city,
      postal_code,
    } = req.body;

    const { id } = await Recipient.create({
      name,
      street,
      number,
      compliment,
      state,
      city,
      postal_code,
    });

    return res.json({
      id,
      name,
      street,
      number,
      compliment,
      state,
      city,
      postal_code,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const deliveries = await Delivery.findOne({
      where: {
        recipient_id: recipient.id,
        signature_id: null,
      },
    });

    if (deliveries) {
      return res
        .status(400)
        .json({ error: 'This Recipient still has an delivery to receive' });
    }

    await recipient.destroy();
    return res.json({});
  }

  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id, {
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
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    return res.json(recipient);
  }
}

export default new RecipientsController();
