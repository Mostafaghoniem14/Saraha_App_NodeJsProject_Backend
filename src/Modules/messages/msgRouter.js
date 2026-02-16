import {Router} from "express";
import { createMessage, getAllMessages, getMessage } from "./msgController.js";
import * as MS from "./msgValidator.js"
import validation from "../../Middlewares/validationMWare.js";
const router = Router();
router.get("/fetchMessages" ,validation(MS.AllMessageSchema), getAllMessages)
router.get("/:msgID" ,validation(MS.singleMessageSchema) ,getMessage)
router.post("/sendMessage" ,validation(MS.MsgSchemaValidation), createMessage)

export default router;
