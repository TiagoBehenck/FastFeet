import * as Yup from 'yup';

import validate from '../util/validate';

class DeliveryProblemValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    await validate(res, next, req.body, schema);
  }
}

export default new DeliveryProblemValidator();
