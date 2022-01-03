import { Router } from "express";
import {registration, login,logOut} from "../../controllers/auth/index";


const router = new Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout",  logOut);



export default router;
