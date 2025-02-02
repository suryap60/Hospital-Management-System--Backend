import express from 'express'
import { adminLogin, adminSignUp } from '../controllers/adminController.js'
// import { forgotPassword } from '../controllers/adminController.js'
import {  forgotPasswordDoctor, loginDoctor, registerDoctor } from '../controllers/doctorController.js'
import { bookAppointment } from '../controllers/appointmentController.js'

import { forgotPassword, login, signUp } from '../controllers/patientConroller.js';
import { nurseforgotPassword, nurselogin, nursesignUp } from '../controllers/nurseController.js';
import { sendOTPController, verifyAndUpdatePassword } from '../controllers/adminForgotPassword.js';
import { sendOTPControllerDoctor } from '../controllers/doctorForgotPasswordController.js';


const router = express.Router()

//Admin
router.post('/register',adminSignUp)
router.post('/adminLogin',adminLogin)
router.post('/sentOTP',sendOTPController)
router.post('/verifyOTP',verifyAndUpdatePassword)
// router.post('/forgot-password',forgotPassword)

//Doctor
router.post('/registerDoctor',registerDoctor)
router.post('/loginDoctor',loginDoctor)
router.post('/forgotPasswordDoctor',forgotPasswordDoctor)
router.post('/sentOTPDoctor',sendOTPControllerDoctor)

//appoinment
router.post('/book',bookAppointment)

//Patient
router.post("/patientlogin",login)
router.post("/patientregister", signUp);
router.post("/patientforgotPassword",forgotPassword)

//Nurse
router.post("/nurselogin",nurselogin)
router.post("/nurseregister",nursesignUp );
router.post("/nurseforgotPassword",nurseforgotPassword)


export { router }