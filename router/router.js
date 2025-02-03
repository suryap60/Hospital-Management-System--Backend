import express from 'express'
import { adminLogin, adminSignUp } from '../controllers/adminController.js'

import { loginDoctor, registerDoctor } from '../controllers/doctorController.js'
import { doctorForgotPassword } from '../controllers/doctorForgotPasswordController.js';
import { doctorResetPassword } from '../controllers/doctorForgotPasswordController.js';

import { bookAppointment } from '../controllers/appointmentController.js'
import { forgotPassword, login, signUp } from '../controllers/patientController.js';
import { nurseforgotPassword, nurselogin, nursesignUp } from '../controllers/nurseController.js';



const router = express.Router()

//Admin
router.post('/register',adminSignUp)
router.post('/adminLogin',adminLogin)
// router.post('/sentOTP',sendOTPController)
// router.post('/verifyOTP',verifyAndUpdatePassword)
// router.post('/forgot-password',forgotPassword)

//Doctor
router.post('/registerDoctor',registerDoctor)
router.post('/loginDoctor',loginDoctor)
router.post('/forgotPasswordDoctor',doctorForgotPassword)
router.post('/doctorResetPassword',doctorResetPassword)

//appoinment
router.post('/book',bookAppointment)

router.post("/patientlogin",login)
router.post("/patientregister", signUp);
router.post("/patientforgotPassword",forgotPassword)
router.post("/bookAppointment",checkauth,bookAppointment)
router.get("/getAppointment",checkauth,getAppointment)
router.post("/nurselogin",nurselogin)
router.post("/nurseregister",nursesignUp );
router.post("/nurseforgotPassword",nurseforgotPassword)


export { router }