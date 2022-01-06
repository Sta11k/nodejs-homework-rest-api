import { Router } from "express";
import { registration, login, logOut } from "../../controllers/auth/index";
import guard from "../../middlewares/guard";
import limiter from "../../middlewares/rate-limit";

const router = new Router();

router.post("/registration", limiter(15 * 60 * 1000, 2), registration);
router.post("/login", login);
router.post("/logout", guard, logOut);

export default router;
