import { userModel } from "../DB/model/User.model.js"
import { verifyToken } from "../utils/Token/token.js"
import * as dbServices from '../DB/dbService.js'

import { publicKey } from "../utils/readKey/keys.js"




export const authenticationGraphQl = async({authorization}={})=>{

  
    
       
        const [bearer,token] = authorization?.split(' ') || []
       
           if (!bearer || !token) {
           
              throw new Error ('authorization is required')
           }
    
       
          
          
           
       
         
          
            
      
           
       
           const decoded = verifyToken({token:token,signature: publicKey })
          
           
           if(!decoded || !decoded.id){
        
               throw new Error('invalid token Payload')
           }
       
           const user = await dbServices.findOne({
               model:userModel,
               filter:{
                   _id:decoded.id,
                 
                  
       
               }
           })
           
           
       
           if (!user) {
           
               throw new Error ('invalid user')
           }
       
           if (user.changeCredentialTime?.getTime()>= decoded.iat * 1000) {
          
               throw new Error ('in-valid Credentials')
               
           }
       
           return user
    
    }
