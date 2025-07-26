
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

// const privateKey = fs.readFileSync(path.join(process.cwd(), 'private.key'), 'utf8')
// const publicKey = fs.readFileSync(path.join(process.cwd(), 'public.key'), 'utf8')
// console.log();


dotenv.config({path:path.resolve('./src/config/.env')})




const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString('utf-8');
const publicKey = Buffer.from(process.env.PUBLIC_KEY , 'base64').toString('utf-8');

export { privateKey, publicKey }