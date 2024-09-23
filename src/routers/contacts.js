import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValid.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';
const contactsRouter = Router();

contactsRouter.get(
  '/',
  ctrlWrapper(contactController.getAllContactsController),
);

contactsRouter.get(
  '/:ContactId',
  isValidId,
  ctrlWrapper(contactController.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.addContactController),
);

contactsRouter.put(
  '/:ContactId',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.upsertContactController),
);

contactsRouter.patch(
  '/:ContactId',
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(contactController.patchContactController),
);

contactsRouter.delete(
  '/:ContactId',
  isValidId,
  ctrlWrapper(contactController.deleteContactController),
);

export default contactsRouter;
