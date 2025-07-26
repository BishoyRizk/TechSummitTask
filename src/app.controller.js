import { connectDB } from './DB/connection.js'
import authController from './modules/auth/auth.controller.js'
import { globalErrorHandling } from './utils/err/err.js'
import userController from './modules/user/user.controller.js'
import noteController from './modules/note/note.controller.js'
import path from 'node:path'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createHandler } from 'graphql-http/lib/use/express'
import { schema } from './modules/schema.js'
import cors from 'cors'
const limiter = rateLimit({
    limit:100,
    windowMs:5*60*1000,
    legacyHeaders:false,
    standardHeaders:'draft-8'
})


const bootstrap = (app, express) => {
    app.use(express.json())
    app.use(helmet())
    app.use(limiter)
    app.use(cors({
  origin: process.env.cors,
  credentials: true
}));
    
    app.use('/graphql',createHandler({schema}))
    app.use('/upload',express.static(path.resolve('./uploads')))
    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Welcome in node.js project powered by express and ES6" })
    })
    app.use("/auth", authController)
    app.use("/user", userController)
    app.use("/note", noteController)

    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "In-valid routing" })
    })

    app.use(globalErrorHandling)

    connectDB()

}

export default bootstrap