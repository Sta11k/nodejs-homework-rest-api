const fs = require("fs/promises");
// const contacts = require('./contacts.json')
const path = require("path");
// import { fs } from "fs/promises";
const filedirectory = (__dirname, "model", "contacts.json");
const listContacts = async () => {
  const contacts = await fs.readFile(path.join(filedirectory), "utf8");
  const result = JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
