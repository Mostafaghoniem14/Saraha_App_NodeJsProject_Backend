import { Router } from "express";
import { changePass, getUsers, updateProfile, uploadFile } from "./userController.js";
import { userauthMWare } from "../../Middlewares/userAuthMWare.js";
import validation from "../../Middlewares/validationMWare.js";
import { changePassSchema, updateSchema } from "./userValidation.js";
import { multerFunc } from "../../../Services/multer.js";

const router = Router();

router.get("/", userauthMWare, getUsers);
router.patch("/updateUser", validation(updateSchema), updateProfile);
router.patch("/changepass", validation(changePassSchema), changePass);
router.post("/upload" , multerFunc().single('test') , uploadFile)

export default router;
