import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  // const contacts = await listContacts();

  const findeContact = contacts.some((el) => el.id === contactId);
  // const filterContact = contacts.filter((el) => el.id !== contactId);
  if (findeContact !== 1) {
    const [result] = contacts.splice(findeContact, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return result;
  }

  return null;
};

// const addContact = async (body) => {};

const addContact = async ({ name, email, phone }) => {
  if (!name || !email || !phone) {
    return;
  }

  const addNewContact = { name, email, phone, id: randomUUID() };
  contacts.push(addNewContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return addNewContact;
};

const updateContact = async (contactId, body) => {
  const findeContact = contacts.some((el) => el.id === contactId);

  if (findeContact !== 1) {
    const updateItemContact = { id: contactId, ...body };
    contacts[findeContact] = updateItemContact;
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return updateItemContact;
  }

  return null;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
