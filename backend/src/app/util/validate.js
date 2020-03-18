export default async function validate(res, next, data, schema) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }

  return next();
}
