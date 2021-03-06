import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveredController {
  async update(req, res) {
    const { id, delivery_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findByPk(delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.deliveryman_id !== Number(id)) {
      return res
        .status(400)
        .json({ error: "Delivery doesn't belongs to the deliveryman " });
    }

    if (!delivery.start_date) {
      return res
        .status(400)
        .json({ error: "Delivery hasn't been started yet" });
    }

    if (delivery.end_date || delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery closed' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Signature must be provided' });
    }

    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });

    await delivery.update({
      end_date: new Date(),
      signature_id: file.id,
      status: 'ENTREGUE',
    });

    return res.json(delivery);
  }
}

export default new DeliveredController();
