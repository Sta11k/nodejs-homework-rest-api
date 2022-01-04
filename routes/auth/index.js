import { Router } from "express";
import { registration, login, logOut } from "../../controllers/auth/index";
import guard from "../../middlewares/guard";

const router = new Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", guard, logOut);

export default router;
