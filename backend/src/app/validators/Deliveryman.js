import * as Yup from 'yup';

import validate from '../util/validate';

class DeliverymanValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      avatar_id: Yup.number(),
    });

    await validate(res, next, req.body, schema);
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().notRequired(),
    });

    await validate(res, next, req.body, schema);
  }
}

export default new DeliverymanValidator();
