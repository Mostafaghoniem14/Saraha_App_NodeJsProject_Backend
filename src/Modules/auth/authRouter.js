import { Router} from "express";
import * as AUC from "./authController.js";
const router = Router();

import validation from "../../Middlewares/validationMWare.js"
import * as USC from "../auth/authValidator.js"

router.post("/register" ,validation(USC.registerSchema), AUC.register);
router.post("/login" ,validation(USC.loginSchema), AUC.login);
router.get("/active_account/:token" , AUC.activate_account)

export default router;