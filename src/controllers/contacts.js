import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contacts.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const data = await contactServices.getAllContacts(
    perPage,
    page,
    sortBy,
    sortOrder,
  );

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { ContactId } = req.params;
  const data = await contactServices.getContactById(ContactId);

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: `Contact with ${ContactId} successfully find`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await contactServices.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { ContactId } = req.params;
  const { isNew, data } = await contactServices.updateContact(
    { _id: ContactId },
    req.body,
    { upsert: true },
  );
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { ContactId } = req.params;
  const result = await contactServices.updateContact(
    { _id: ContactId },
    req.body,
  );

  if (!result) {
    throw createHttpError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { ContactId } = req.params;
  const data = await contactServices.deleteContatc({ _id: ContactId });

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).send();
};
