import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateOptions } from '../hooks/hooks.js';

import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Username must be exist'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email must be exist'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;
