import { Router } from "express";
import model from "../../model/index.js";
import { validateCreation, validateUpdate, validateId } from "./validation";
const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  // console.log(contacts);
  res.status(200).json(contacts);
});

router.get("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  }

  res.status(404).json({ message: "Not found" });
});

router.post("/", validateCreation, async (req, res, next) => {
  const addContact = await model.addContact(req.body);
  res.status(201).json(addContact);
});

router.delete("/:id", validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
  console.log("contact", contact);
  console.log("id", id);
  if (contact) {
    return res.status(200).json({ contact });
  }

  res.status(404).json({ message: "Not found" });
});

router.put("/:id", validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  // if (!req.body) {
  //    res.status(400).json({ message: "missing fields" });
  // }
  if (contact) {
    return res.status(200).json(contact);
  }

  res.status(404).json({ message: "Not found" });
});

export default router;
