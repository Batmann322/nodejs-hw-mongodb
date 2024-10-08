import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValid.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contacts.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

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
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.addContactController),
);

contactsRouter.put(
  '/:ContactId',
  upload.single('photo'),
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.upsertContactController),
);

contactsRouter.patch(
  '/:ContactId',
  upload.single('photo'),
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
