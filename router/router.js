import express from 'express'
import { adminLogin, adminSignUp } from '../controllers/adminController.js'
import { forgotPassword } from '../controllers/adminController.js'

const router = express.Router()

router.post('/register',adminSignUp)
router.post('/adminLogin',adminLogin)
router.post('/forgot-password',forgotPassword)


export { router }