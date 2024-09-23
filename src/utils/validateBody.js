import createHttpError from 'http-errors';

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const validateError = createHttpError(400, error.massage);
      next(validateError);
    }
  };
  return func;
};

export default validateBody;
