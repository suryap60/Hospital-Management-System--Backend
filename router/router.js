import express from 'express'
import { adminLogin, adminSignUp } from '../controllers/adminController.js'
import { forgotPassword } from '../controllers/adminController.js'
import { forgotPasswordDoctor, loginDoctor, registerDoctor } from '../controllers/doctorController.js'
import { bookAppointment } from '../controllers/appointmentController.js'

import { forgotPassword, login, signUp } from '../controller/patientController.js';
import { nurseforgotPassword, nurselogin, nursesignUp } from '../controller/nurseController.js';

//Patient
router.post('/register',adminSignUp)
router.post('/adminLogin',adminLogin)
router.post('/forgot-password',forgotPassword)

//Doctor
router.post('/registerDoctor',registerDoctor)
router.post('/loginDoctor',loginDoctor)
router.post('/forgotPasswordDoctor',forgotPasswordDoctor)

//appoinment
router.post('/book',bookAppointment)

router.post("/patientlogin",login)
router.post("/patientregister", signUp);
router.post("/patientforgotPassword",forgotPassword)
router.post("/nurselogin",nurselogin)
router.post("/nurseregister",nursesignUp );
router.post("/nurseforgotPassword",nurseforgotPassword)



const router = express.Router()


export { router }