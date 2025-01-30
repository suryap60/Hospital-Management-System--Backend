import express from 'express'
import { adminLogin, adminSignUp } from '../controllers/adminController.js'
import { forgotPassword } from '../controllers/adminController.js'
import { forgotPasswordDoctor, loginDoctor, registerDoctor } from '../controllers/doctorController.js'

const router = express.Router()

//Patient
router.post('/register',adminSignUp)
router.post('/adminLogin',adminLogin)
router.post('/forgot-password',forgotPassword)

//Doctor
router.post('/registerDoctor',registerDoctor)
router.post('/loginDoctor',loginDoctor)
router.post('/forgotPasswordDoctor',forgotPasswordDoctor)



export { router }