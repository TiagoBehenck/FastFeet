import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  async index(req, res) {
    const { delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id,
      },
      attributes: ['id', 'description', 'created_at'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
          include: [
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'street',
                'number',
                'postal_code',
                'compliment',
                'state',
                'city',
              ],
            },
            {
              model: Deliveryman,
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
              model: File,
              as: 'signature',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(problems);
  }

  async store(req, res) {
    const { delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery is canceled' });
    }

    const { description } = req.body;
    const problem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.status(201).json(problem);
  }

  // async delete(req, res) {
  //   const { id } = req.params;

  //   const { delivery_id, description } = await DeliveryProblem.findById(id);

  //   const delivery = await Delivery.findByPk(delivery_id, {
  //     include: [
  //       {
  //         model: Deliveryman,
  //         as: 'deliveryman',
  //         attributes: ['id', 'name', 'email'],
  //       },
  //       {
  //         model: Recipient,
  //         as: 'recipient',
  //       },
  //     ],
  //   });

  //   await delivery.update({ canceled_at: new Date(), status: 'CANCELADA' });
  //   await DeliveryProblem.findByIdAndDelete(id);

  //   await Queue.add(CancelationDeliveryMail.key, {
  //     deliveryman: delivery.deliveryman,
  //     description,
  //     recipient: delivery.recipient,
  //     product: delivery.product,
  //   });

  //   return res.json({});
  // }
}

export default new DeliveryProblemController();
