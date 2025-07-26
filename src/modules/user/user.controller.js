import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import * as user from './service/user.service.js'
import { fileTypes, uploadFile } from "../../utils/multer/multer.js";
import { validation } from "../../middleware/validation.middleware.js";
import { logout } from "./user.validation.js";

const router = Router()

router.patch('/uploadFile',authentication(),uploadFile({fileCheck:fileTypes.images}).single('image'),user.uploadFile)
router.post('/logout',authentication(),validation(logout),user.logout)

export default router