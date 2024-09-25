import { Schema, model } from 'mongoose';

import {
  contactTypeList,
  phoneNumberRegexp,
} from '../../constants/conatcts.js';

import { handleSaveError, setUpdateOptions } from '../hooks/hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be exist'],
      min: 3,
      max: 20,
    },
    phoneNumber: {
      type: String,
      required: [true, 'type of contact must be exist'],
      match: phoneNumberRegexp,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: [true, 'type of contact must be exist'],
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);
contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleSaveError);

const ContactCollection = model('contact', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export default ContactCollection;
