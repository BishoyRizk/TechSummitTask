import  bootstrap  from './src/app.controller.js'
import  express  from 'express'
import * as dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({path:path.resolve('./src/config/.env')})
const app = express()
const port = process.env.PORT||5000

bootstrap(app , express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))