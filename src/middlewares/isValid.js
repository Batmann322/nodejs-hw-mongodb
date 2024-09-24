import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { ContactId } = req.params;
  if (!isValidObjectId(ContactId)) {
    return next(createHttpError(404, `${ContactId} not valid id`));
  }
  next();
};

export default isValidId;
