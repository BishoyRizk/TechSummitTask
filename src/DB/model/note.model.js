import mongoose, { model, Schema, Types } from "mongoose";



export const noteSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxlength:25,
        minlength:5
    },
    content:{
        type:String,
        required:true,
        maxlength:1000,
        minlength:250
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

export const noteModel = mongoose.models.Note || model('Note',noteSchema)