
import joi from "joi";
import { Types } from "mongoose";
// import { genderTypes } from "../DB/model/User.model.js";

const checkObjectId = (value,helper)=>{
    return Types.ObjectId.isValid(value) ? true : helper.message('in-valid objectId')
}



export const fileObject = {
    fieldname: joi.string(),
    originalname: joi.string(),
    encoding: joi.string(),
    mimetype: joi.string(),
    destination: joi.string(),
    filename: joi.string(),
    path: joi.string(),
    size: joi.number()
}
export const generalFields = {
    userName:joi.string().min(2).max(25).trim(),
    title:joi.string().min(5).max(25).trim(),
    content:joi.string().min(250).max(1000).trim(),
    email:joi.string().email({tlds:{allow:['com','net']},minDomainSegments:2,maxDomainSegments:3}),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    confirmPassword:joi.string().valid(joi.ref('password')),
    code:joi.string().pattern(new RegExp(/^[\d]{4}$/)),
    DOB:joi.date().less('now'),
    date:joi.date(),
    // gender:joi.string().valid(...Object.values(genderTypes)),
    id:joi.string().custom(checkObjectId),
    file:joi.object(fileObject),
    fileObject,
    phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)).messages({
        'string.pattern.base':'only egyptian numbers are allowed' }),     
}







export const validation=(schema)=>{
    return(req,res,next)=>{
        let inputDate = {...req.body,...req.params,...req.query}


        const check = schema.validate(inputDate,{abortEarly:false})

        if (check.error) {
            return res.status(400).json({message:check.error.details})
        }

        return next()
    }
}