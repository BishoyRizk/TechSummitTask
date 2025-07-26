import mongoose, { model, Schema } from "mongoose"
import { generateHash } from "../../utils/security/hash.js"


const userSchema = new Schema({
    username:{
        type:String,
        maxlength:25,
        minlength:2,
        required:true
    },
    email:{
         type:String,
         unique:true,
                 required:true

 
    },
    password:{
                type:String,
                        required:true


    },
    photo:{
        type:String
    },
    changeCredentials:Date,
    otp:{
        type:String
        
    },
    otpExpire:{
        type:Date
        
    }
})

userSchema.pre('save',function(next){
   
    
    this.password = generateHash({plainText:this.password})
    
    
    return next()
})
export const   userModel = mongoose.models.User || model('User',userSchema)