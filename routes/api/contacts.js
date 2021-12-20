import { Router } from "express";
import model from "../../model/index.js";
const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  console.log("contact", contact);
  console.log("id", id);
  if (contact) {
    return res.status(200).json(contact);
  }

  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const addContact = await model.addContact(req.body);
  res.status(201).json(addContact);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
  console.log("contact", contact);
  console.log("id", id);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }

  res.status(404).json({ message: "Not found" });
});

router.patch("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
