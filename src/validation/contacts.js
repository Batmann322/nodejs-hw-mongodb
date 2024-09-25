import Joi from 'joi';

import { contactTypeList } from '../constants/conatcts.js';
import { phoneNumberRegexp } from '../constants/conatcts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'name must be exist',
  }),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp).required().messages({
    'any.required': 'number must be exist',
  }),
  email: Joi.string().email().allow(null, ''),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .required()
    .messages({
      'any.required': 'type of contact must be exist',
    }),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string().pattern(phoneNumberRegexp),
  email: Joi.string().email().allow(null, ''),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
