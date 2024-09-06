import ContactCollection from '../db/models/Contacts.js';

export const getAllContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);
