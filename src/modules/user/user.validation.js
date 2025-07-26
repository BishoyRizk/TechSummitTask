import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";


export const logout = Joi.object().keys({
    email:generalFields.email.required(),
    password:generalFields.password.required()
}).required()