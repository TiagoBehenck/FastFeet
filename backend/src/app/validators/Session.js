import * as Yup from 'yup';

import validate from '../util/validate';

class SessionValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    await validate(res, next, req.body, schema);
  }
}

export default new SessionValidator();
