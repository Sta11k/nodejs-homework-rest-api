import { Router } from "express";
import {
  addNewContact,
  getContactById,
  getContacts,
  removeContactId,
  updateContact,
} from "../../controllers/contacts";
import {
  validateCreation,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "./validation";
import guard from "../../middlewares/guard";
const router = new Router();

router.get("/", [guard, validateQuery], getContacts);

router.get("/:id", [guard, validateId], getContactById);

router.post("/", [guard, validateCreation], addNewContact);

router.delete("/:id", [guard, validateId], removeContactId);

router.put("/:id", [guard, validateId, validateUpdate], updateContact);

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContact
);

export default router;
