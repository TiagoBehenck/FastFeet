import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q: deliverymanName, page = 1 } = req.query;

    const deliverymans = deliverymanName
      ? await Deliveryman.findAll({
          where: {
            name: {
              [Op.like]: `%${deliverymanName}%`,
            },
          },
          order: ['id'],
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        })
      : await Deliveryman.findAll({
          attributes: ['id', 'name', 'email'],
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        });

    return res.status(200).json(deliverymans);
  }

  async store(req, res) {
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.status(200).json(deliveryman);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    if (!deliveryman) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json(deliveryman);
  }

  async update(req, res) {
    const { name, email, avatar_id } = req.body;

    if (avatar_id) {
      const avatarExists = await File.findByPk(avatar_id);

      if (!avatarExists) {
        return res.status(400).json({ error: 'File does not exists' });
      }
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    if (email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await deliveryman.update({ name, email, avatar_id });

    const { avatar } = await Deliveryman.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'User not found' });
    }

    await deliveryman.destroy();

    return res.status(200).json(deliveryman);
  }
}

export default new DeliverymanController();
