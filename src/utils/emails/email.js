import { EventEmitter } from "events";
import * as dbService from '../../DB/dbService.js'
import { userModel } from "../../DB/model/User.model.js";
import { customAlphabet } from "nanoid";
import { generateHash } from "../security/hash.js";
import { sendEmail } from "../nodemailer/nodemailter.js";
import { verfiEmailTemplate } from "./emailTemp.js";


export const event = new EventEmitter()

event.on('forgetPassword',async(data)=>{
    const  {email} = data
    const otp = customAlphabet('0123456789',4)()
    await dbService.updateOne({
        model:userModel,
        filter:{
            email
        },
        data:{
            otp: generateHash({plainText:otp}),
            otpExpire: new Date (Date.now() + 2 *60 *1000)
        }
    })

   await sendEmail({to:email,subject:'forgetPassword',text:'use this code',html:verfiEmailTemplate({code:otp,message:'forgetPassword'})})
})