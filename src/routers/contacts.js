import { Router } from 'express';
import * as contactController from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get(
  '/',
  ctrlWrapper(contactController.getAllContactsController),
);

contactsRouter.get(
  '/:ContactId',
  ctrlWrapper(contactController.getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactController.addContactController));

contactsRouter.put(
  '/:ContactId',
  ctrlWrapper(contactController.upsertContactController),
);

contactsRouter.patch(
  '/:ContactId',
  ctrlWrapper(contactController.patchContactController),
);

contactsRouter.delete(
  '/:ContactId',
  ctrlWrapper(contactController.deleteContactController),
);

export default contactsRouter;
