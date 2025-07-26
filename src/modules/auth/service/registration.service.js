import { asyncHandler } from "../../../utils/err/err.js";

import * as dbService from '../../../DB/dbService.js'
import { userModel } from "../../../DB/model/User.model.js";
import { successResponse } from "../../../utils/Response/response.js";
import { compareHash, generateHash } from "../../../utils/security/hash.js";
import { generateToken } from "../../../utils/Token/token.js";
import { event } from "../../../utils/emails/email.js";
import { privateKey } from "../../../utils/readKey/keys.js";



/**
 * Registers a new user with username, email, and password.
 * 
 * @access Public
 * @param {Object} req.body - The request body
 * @param {string} req.body.username - The user's username
 * @param {string} req.body.email - The user's email (must be unique)
 * @param {string} req.body.password - The user's password
 * @returns {Object} 201 - Success message if user is created
 * @throws {Error} 409 - If the email already exists
 */

export const signup = asyncHandler(
    async(req,res,next)=>{
        const {username,email,password} = req.body

        const user = await dbService.findOne({
            model:userModel,
            filter:{
                email
            }
        })

        if (user) {
            return next (new Error('email already exists',{cause:409}))
        }


        await dbService.create({
          model:  userModel,
          data:{
            username,email,password
          }
        })


        return successResponse({res,status:201,message:'user created successfully'})
    }
)



/**
 * Logs in a user by verifying email and password, then returns an access token.
 * 
 * @access Public
 * @param {Object} req.body - The request body
 * @param {string} req.body.email - The user's email
 * @param {string} req.body.password - The user's password
 * @returns {Object} 200 - Object containing the access token
 * @throws {Error} 404 - If email does not exist or password is incorrect
 */

export const login = asyncHandler(
    async(req,res,next)=>{
        const {email,password} = req.body

        const user = await dbService.findOne({
            model:userModel,
            filter:{
                email
            }
        })

        if (!user) {
            return next (new Error ("email does not exist",{cause:404}))
        }

        if (!compareHash({plainText:password,hashValue:user.password})) {
            return next (new Error ("email does not exist",{cause:404}))

        }

        // const accessToken = generateToken({payLoad:{id:user._id},signature:process.env.USER_ACCESS_TOKEN,expiresIn:'1d'})
       const accessToken = generateToken({
  payLoad: { id: user._id },
  signature: privateKey,
  expiresIn: '1d'
}) 

        return successResponse({res,data:{accessToken}})
    }
)



/**
 * Handles forgot password request by checking if email exists, then emits an OTP event.
 * 
 * @access Public
 * @param {Object} req.body - The request body
 * @param {string} req.body.email - The user's registered email
 * @returns {Object} 200 - Success message indicating OTP was sent
 * @throws {Error} 404 - If the email does not exist
 */

export const forgetPassword = asyncHandler(
    async(req,res,next)=>{
        const {email} = req.body


      if (!  await dbService.findOne({model:userModel,
            filter:{
                email
            }})) 
        
        {
            return next ( new Error ('email does not exist',{cause:404}))
      }

      event.emit('forgetPassword',{email})

      return successResponse({res,message:'otp number sent successfully'})
    }
)


/**
 * Resets the user's password after validating email, OTP, and expiry time.
 * 
 * @access Public
 * @param {Object} req.body - The request body
 * @param {string} req.body.email - The user's registered email
 * @param {string} req.body.password - The new password to set
 * @param {string} req.body.otp - The one-time password sent to the user
 * @returns {Object} 200 - Success message if password updated
 * @throws {Error} 404 - If the email does not exist
 * @throws {Error} 400 - If the OTP is invalid or expired
 */

export const resetPassword = asyncHandler(
    async(req,res,next)=>{
        const {email,password,otp}= req.body

        const user = await dbService.findOne({
            model:userModel,
            filter:{
                email
            }
        })

        if(!user){
            return next ( new Error ('email does not exist',{cause:404}))
        }

        if (user.otpExpire< Date.now()) {
             return next ( new Error ('otp is expired',{cause:400}))

        }

        if (!compareHash({plainText:otp,hashValue:user.otp})) {
             return next ( new Error ('in-valid otp',{cause:400}))

        }

        await dbService.updateOne({
            model:userModel,
            filter:{email},
            data:{
                password: generateHash({plainText:password}),
                
                $unset:{otp:null,otpExpire:null}
            }
        })


        return successResponse({res,message:'password updated successfully'})
    }
)
