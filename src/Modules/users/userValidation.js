import Joi from "joi";

export const updateSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  _id: Joi.string(),
}).required();

export const changePassSchema = Joi.object({
  email: Joi.string().email().required(),
  currentPass: Joi.string().required(),
  newPass: Joi.string().not(Joi.ref("currentPass")).required(),
  confirmPass: Joi.string().valid(Joi.ref("newPass")).required(),
}).required();
