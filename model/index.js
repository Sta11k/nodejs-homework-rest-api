import { ObjectId } from "mongodb";
import db from "./db";

const getCollectionLoad = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  // const result = await collection.find().toArray();
  return collection;
};

const listContacts = async () => {
  const collection = await getCollectionLoad(db, "contacts");
  const result = await collection.find().toArray();
  return result;
};

const getContactById = async (contactId) => {
  const collection = await getCollectionLoad(db, "contacts");
  const _id = ObjectId(contactId);
  const [result] = await collection.find({ _id }).toArray();
  return result;
};

const removeContact = async (contactId) => {
  const collection = await getCollectionLoad(db, "contacts");
  const _id = ObjectId(contactId);
  const { value: result } = await collection.findOneAndDelete({ _id });
  console.log(value);
  return result;
};

const addContact = async (body) => {
  const collection = await getCollectionLoad(db, "contacts");
  const newContact = {
    favorite: false,
    ...body,
  };
  const result = await collection.insertOne(newContact);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollectionLoad(db, "contacts");
  const _id = ObjectId(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnDocument: "after" }
  );

  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
