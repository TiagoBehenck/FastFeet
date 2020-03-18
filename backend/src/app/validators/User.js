import * as Yup from 'yup';

import validate from '../util/validate';

class UserValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await validate(res, next, req.body, schema);
  }
}

export default new UserValidator();
