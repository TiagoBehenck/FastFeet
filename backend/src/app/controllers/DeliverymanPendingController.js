import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryPendingController {
  async index(req, res) {
    const { id: deliverymanId } = req.params;
    const { page = 1 } = req.query;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        status: 'PENDENTE',
        signature_id: null,
        canceled_at: null,
      },
      order: ['id'],
      limit: 5,
      offset: (page - 1) * 5,
      attributes: [
        'id',
        'deliveryman_id',
        'product',
        'status',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'city',
            'street',
            'number',
            'state',
            'postal_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryPendingController();
