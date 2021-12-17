import { Router } from "express";
import model from "../../model/index";
const router = new Router();

router.get("/", async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
});

router.get("/:Id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  console.log(contact);
  if (contact) {
    return res.status(200).json({ contact });
  }

  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
