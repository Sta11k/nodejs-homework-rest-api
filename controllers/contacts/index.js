import { HttpCode } from "../../lib/constants";
import { HttpMessage } from "../../lib/message";
import repositoryContacts from "../../repository/contacts";

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await repositoryContacts.listContacts(userId, req.query);
  res.status(HttpCode.OK).json({
    status: HttpMessage.SUCCESS,
    code: HttpCode.OK,
    data: { ...contacts },
  });
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await repositoryContacts.getContactById(userId, id);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: HttpMessage.SUCCESS,
      code: HttpCode.OK,
      data: { contact },
    });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: HttpMessage.ERROR,
    code: HttpCode.NOT_FOUND,
    message: HttpMessage.NOT_FOUND,
  });
};

const addNewContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const addContact = await repositoryContacts.addContact(userId, req.body);
  res.status(HttpCode.CREATED).json({
    status: HttpMessage.SUCCESS,
    code: HttpCode.OK,
    data: { contact: addContact },
  });
};

const removeContactId = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await repositoryContacts.removeContact(userId, id);
  console.log("contact", contact);
  console.log("id", id);
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: HttpMessage.SUCCESS,
      code: HttpCode.OK,
      data: { contact },
    });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: HttpMessage.ERROR,
    code: HttpCode.NOT_FOUND,
    message: HttpMessage.NOT_FOUND,
  });
};

const updateContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(userId, id, req.body);
  // if (!req.body) {
  //    res.status(400).json({ message: "missing fields" });
  // }
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: HttpMessage.SUCCESS,
      code: HttpCode.OK,
      data: { contact },
    });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: HttpMessage.ERROR,
    code: HttpCode.NOT_FOUND,
    message: HttpMessage.NOT_FOUND,
  });
};

export {
  getContactById,
  getContacts,
  addNewContact,
  removeContactId,
  updateContact,
};
