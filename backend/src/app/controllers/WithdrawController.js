import { parseISO, getHours } from 'date-fns';

// import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class WithdrawController {
  async update(req, res) {
    const { start_date } = req.body;
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

    if (delivery.start_date) {
      return res.status(400).json({ error: 'Delivery has alredy started' });
    }

    const parsedDate = parseISO(start_date);
    const hour = getHours(parsedDate);
    if (hour >= 18 || hour < 8) {
      return res
        .status(400)
        .json({ error: 'Withdraw can only be done between 08:00 and 18:00' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        // date_start: {
        //   deliveryman_id: id,
        //   [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        // },
        deliveryman_id: id,
        start_date: null,
        signature_id: null,
      },
    });
    if (deliveries.length >= 5) {
      return res
        .status(400)
        .json({ error: 'A deliveryman can make only 5 withdraws a day' });
    }

    await delivery.update({ start_date, status: 'RETIRADA' });

    // await delivery.reload({
    //   attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
    //   include: [
    //     {
    //       model: Deliveryman,
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

    return res.status(200).json(delivery);
  }
}

export default new WithdrawController();
