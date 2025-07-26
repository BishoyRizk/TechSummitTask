import jwt from 'jsonwebtoken'
import { tokenTypes } from '../../middleware/auth.middleware.js'
import * as dbServices from '../../DB/dbService.js'
import { userModel } from '../../DB/model/User.model.js'
import {privateKey,publicKey} from '../readKey/keys.js'

// export const generateToken = ({payLoad={},signature=process.env.USER_ACCESS_TOKEN,expiresIn=1800}={})=>{
//     const token = jwt.sign(payLoad,signature,{expiresIn})
//     return token
// }

// export const verifyToken = ({token='',signature=process.env.USER_ACCESS_TOKEN}={})=>{
//     const decoded = jwt.verify(token,signature)
//     return decoded
// }


export const generateToken = ({ payLoad = {}, expiresIn = 1800 } = {}) => {
  return jwt.sign(payLoad, privateKey, {
    algorithm: 'RS256',
    expiresIn
  })
}


export const verifyToken = ({ token = '' } = {}) => {
  const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
  return decoded
}











export const decodedToken = async({authorization='',next}={})=>{

  
        
        const [bearer,token] = authorization?.split(' ') || []
    
        if (!bearer || !token) {
            return next (new Error ('Authorization is required',{cause:400}))
        }
        // let accessSignature = undefined
        // // let refreshSignature = undefined
        // switch (bearer) {
        //     case 'bearer':
        //         // refreshSignature =process.env.USER_REFRESH_TOKEN
        //         accessSignature = process.env.USER_ACCESS_TOKEN
        //         break;
        //     case 'system':
        //         // refreshSignature =process.env.SYSTEM_REFRESH_TOKEN
        //         accessSignature = process.env.SYSTEM_ACCESS_TOKEN
        //         break;
        
        //     default:
        //         break;
        // }
    
    
        const decoded = verifyToken({token:token,signature: publicKey })
    
        if (!decoded?.id) {
            return next (new Error ('in-valid token payload',{cause:400}))
        }
    
        // const user = await userModel.findOne({_id:decoded.id,isDeleted:false})
        const user = await dbServices.findOne({
            model:userModel,
            filter:{_id:decoded.id}
        })
    
        if (!user) {
            return next (new Error ('in-valid account',{cause:404}))
        }
        if (user.changeCredentials?.getTime()>= decoded.iat * 1000) {
            return next (new Error ('in-valid Credentials',{cause:400}))
        }
    
        return user


}