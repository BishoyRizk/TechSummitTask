import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";


export const signup = Joi.object().keys({
    username:generalFields.userName.required(),
    email:generalFields.email.required(),
    password:generalFields.password.required()
})
.required()
export const login = Joi.object().keys({
  
    email:generalFields.email.required(),
    password:generalFields.password.required()
})
.required()

export const forgetPassword =  Joi.object().keys({
  
    email:generalFields.email.required(),
    
})
.required()
export const resetPassword =  Joi.object().keys({
    password:generalFields.password.required(),
    otp:generalFields.code.required(),
    email:generalFields.email.required(),
    
})
.required()