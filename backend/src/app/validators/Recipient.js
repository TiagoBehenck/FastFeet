// SCHEMAS IGUAIS

import * as Yup from 'yup';

import validate from '../util/validate';

class RecipientsValidator {
  async store(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      compliment: Yup.string().notRequired(),
      state: Yup.string()
        .required('O estado é obrigatório, dois caracteres')
        .max(2),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    await validate(res, next, req.body, schema);
  }

  // async update(req, res, next) {
  //   const schema = Yup.object().shape({
  //     name: Yup.string().required(),
  //     street: Yup.string().required(),
  //     number: Yup.number().notRequired(),
  //     complement: Yup.string().notRequired(),
  //     state: Yup.string()
  //       .required()
  //       .max(2),
  //     city: Yup.string().required(),
  //     postal_code: Yup.string()
  //       .length(8)
  //       .required(),
  //   });

  //   await validate(res, next, req.body, schema);
  // }
}

export default new RecipientsValidator();
