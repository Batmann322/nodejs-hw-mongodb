import ContactCollection from '../db/models/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  perPage,
  page,
  sortBy = '_ContactId',
  sortOrder = SORT_ORDER[0],
  userId,
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactCollection.find({ userId });
  const count = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    data,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContactById = (filter) => ContactCollection.findOne(filter);
export const createContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (
  ContactId,
  userId,
  payload,
  options = {},
) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id: ContactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return rawResult.value;
};

export const deleteContatc = (filter) =>
  ContactCollection.findOneAndDelete(filter);
