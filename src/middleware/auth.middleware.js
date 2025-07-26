import { asyncHandler } from "../utils/err/err.js"
import { decodedToken } from "../utils/Token/token.js"

export const tokenTypes = {
    access:'access',
    refresh:'refresh'
}



export const authentication = ()=>{
 return asyncHandler(
   async(req,res,next)=>{
      
    
    req.user = await decodedToken({authorization:req.headers.authorization,next})
    return next()
    
    }
    
 )
}



export const authorization = (accessRoles=[])=>{
    return asyncHandler(
        async(req,res,next)=>{

            if (!accessRoles.includes(req.user.role)) {
                return next (new Error ('not authorized account',{cause:403}))
            }
    
    
            return next()
    
        }
    )
}




