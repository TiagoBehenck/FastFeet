import * as Yup from 'yup';

import validate from '../util/validate';

class WithdrawValidator {
  async update(req, res, next) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    await validate(res, next, req.body, schema);
  }
}

export default new WithdrawValidator();
