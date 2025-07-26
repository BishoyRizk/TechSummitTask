import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";


export const createNote = Joi.object().keys({
    title:generalFields.title.required(),
    content:generalFields.content.required(),
}).required()
export const deleteNote = Joi.object().keys({
    noteId:generalFields.id.required()
}).required()
export const summarize = Joi.object().keys({
    noteId:generalFields.id.required()
}).required()



export const graphqlSchemeForNotes = Joi.object().keys({
    title: generalFields.title.required(),
    userId:generalFields.id.required(),
    to:generalFields.date.required(),
    from:generalFields.date.required(),
    page:Joi.number().positive().min(1),
    limit:Joi.number().positive().min(5)

}).required()