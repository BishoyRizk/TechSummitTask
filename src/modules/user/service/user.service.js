import { asyncHandler } from "../../../utils/err/err.js";
import * as dbService from '../../../DB/dbService.js'
import { userModel } from "../../../DB/model/User.model.js";
import { successResponse } from "../../../utils/Response/response.js";
import { compareHash } from "../../../utils/security/hash.js";



/**
 * Uploads a profile photo for the authenticated user and updates their record.
 * 
 * @access Private
 * @param {Object} req.file - The uploaded file (handled by multer)
 * @returns {Object} 200 - Success message after updating the photo
 * @throws {Error} 500 - If an error occurs during the update
 */

export const uploadFile = asyncHandler(
    async(req,res,next)=>{
         const filePath = `/upload/${req.file.filename}`
        await dbService.updateOne({
            model:userModel,
            filter:{
                _id:req.user._id
            },data:{
                photo:'uploads/'+req.file.filename
            }
        })
        
        

        return successResponse({res,message:'photo updated successfully'})
    }
)



/**
 * Logs out the authenticated user by verifying credentials and updating logout timestamp.
 * 
 * @access Private
 * @param {Object} req.body - The request body
 * @param {string} req.body.email - The user's email
 * @param {string} req.body.password - The user's password
 * @returns {Object} 200 - Success message confirming logout
 * @throws {Error} 404 - If the user doesn't exist or credentials are invalid
 */

export const logout = asyncHandler(
    async(req,res,next)=>{
        const {email,password}= req.body



        const user = await dbService.findOne({
            model:userModel,
            filter:{
                email,
                _id:req.user._id
            }
        })

        if (!user) {
            return next (new Error ('user does not exist',{cause:404}))
        }

        if (!compareHash({plainText:password,hashValue:user.password})) {
            return next (new Error ('user does not exist',{cause:404}))
        }


        
        await dbService.updateOne({
            model:userModel,
            filter:{
                email,
                _id:req.user._id
            },
            data:{
                changeCredentials:Date.now()
            }
        })

        return successResponse({res,message:'user loggedOut'})

    }
)