import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

export const register = async (payload) => {
  const { email } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }
  const data = await UserCollection.create(payload);
  delete data._doc.password;
  return data._doc;
};
