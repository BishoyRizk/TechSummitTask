
import bcrypt from 'bcrypt'
export const generateHash = ({plainText='',salt=process.env.salt}={})=>{
    const hash = bcrypt.hashSync(plainText,parseInt(salt))
    return hash
}


export const compareHash = ({plainText='',hashValue=''}={})=>{
    const hash = bcrypt.compareSync(plainText,hashValue)
    return hash
}