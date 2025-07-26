import { asyncHandler } from "../../../utils/err/err.js";

import * as dbService from '../../../DB/dbService.js'
import { noteModel } from "../../../DB/model/note.model.js";
import { successResponse } from "../../../utils/Response/response.js";
import {run} from './summarize.js'


/**
 * Creates a new note for the authenticated user.
 * 
 * @access Private
 * @param {Object} req.body - The request body
 * @param {string} req.body.title - The title of the note
 * @param {string} req.body.content - The content of the note
 * @returns {Object} 201 - The created note object
 * @throws {Error} 500 - If an error occurs while creating the note
 */

export const createNote = asyncHandler(
    async(req,res,next)=>{
        const {title,content}=req.body

        const note = await dbService.create({
            model:noteModel,
            data:{
                title,content,userId:req.user._id
            }
        })


        return successResponse({res,data:{note}})
    }
)



/**
 * Deletes a specific note belonging to the authenticated user.
 * 
 * @access Private
 * @param {Object} req.params - The route parameters
 * @param {string} req.params.noteId - The ID of the note to be deleted
 * @returns {Object} 200 - Success message after deletion
 * @throws {Error} 404 - If the note does not exist
 */


export const deleteNote = asyncHandler(
    async(req,res,next)=>{
        const {noteId} =req.params

        const note = await dbService.findOne({
            model:noteModel,
            filter:{
                userId:req.user._id,
                _id:noteId
            }
        })

        if (!note) {
            return next (new Error ('this note does exists',{cause:404}))
        }

        await dbService.deleteOne({
            model:noteModel,
            filter:{
                 _id:req.user._id,
                _id:noteId
            }
        })

        return successResponse({res,message:'note deleted successfully'})
    }
)



/**
 * Summarizes the content of a specific note for the authenticated user.
 * 
 * @access Private
 * @param {Object} req.params - The route parameters
 * @param {string} req.params.noteId - The ID of the note to summarize
 * @returns {Object} 200 - Object containing the summarized content
 * @throws {Error} 404 - If the note does not exist
 */

export const summarizeNotes = asyncHandler(
    async(req,res,next)=>{
        const {noteId}=req.params

        const note = await dbService.findOne({
            model:noteModel,
            filter:{
                _id:noteId,
                userId:req.user._id
            }
        })


        if (!note) {
            return next (new Error ('note does exist',{cause:404}))
        }
      
        
        
        const summarized = await run(note.content)

        return successResponse({res,data:{summarized}})
    }
)