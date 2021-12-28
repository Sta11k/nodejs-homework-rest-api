import { Router } from "express";
import { addNewContact, getContactById, getContacts, removeContactId, updateContact } from "../../controllers/contacts";
import { validateCreation, validateUpdate, validateId, validateUpdateFavorite, validateQuery } from "./validation";

const router = new Router();

router.get("/", validateQuery ,getContacts);

router.get("/:id", validateId, getContactById);

router.post("/", validateCreation, addNewContact);

router.delete("/:id", validateId, removeContactId);

router.put("/:id", validateId, validateUpdate,updateContact );

router.patch('/:id/favorite', validateId, validateUpdateFavorite,updateContact );

export default router;
