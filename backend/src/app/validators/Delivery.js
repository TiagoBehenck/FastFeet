import * as Yup from 'yup';

import validate from '../util/validate';

class DeliveryValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .integer()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .required(),
      product: Yup.string().required(),
    });

    await validate(res, next, req.body, schema);
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      deliveryman_id: Yup.number().integer(),
      recipient_id: Yup.number().integer(),
    });

    await validate(res, next, req.body, schema);
  }
}

export default new DeliveryValidator();
