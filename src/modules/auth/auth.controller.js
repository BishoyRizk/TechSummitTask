
import { Router } from 'express'
// import { signup } from './service/registration.service.js';
import * as registrationService from './service/registration.service.js';
import { validation } from '../../middleware/validation.middleware.js';
import { forgetPassword, login, resetPassword, signup } from './auth.validation.js';


const router = Router();


router.post("/signup",validation(signup), registrationService.signup)
router.post("/login",validation(login), registrationService.login)
router.post('/forgetPassword',validation(forgetPassword),registrationService.forgetPassword)
router.patch('/resetPassword',validation(resetPassword),registrationService.resetPassword)


export default router