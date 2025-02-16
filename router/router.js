import express from 'express'
import { adminLogin, adminSignUp } from '../controllers/adminController.js'

import { loginDoctor, registerDoctor } from '../controllers/doctorController.js'
import { doctorForgotPassword } from '../controllers/doctorForgotPasswordController.js';
import { doctorResetPassword } from '../controllers/doctorForgotPasswordController.js';
import { viewPatients } from '../controllers/doctorViewPatients.js';

import { forgotPassword, login, signUp } from '../controllers/patientController.js';
import { nurseforgotPassword, nurselogin, nursesignUp } from '../controllers/nurseController.js';
import patientAppointment from '../controllers/patientAppointment.js';
import { viewPatientAppointment, updateAppointmentStatus, deleteAppointment } from '../controllers/doctorAppointmentController.js';
import checkAuth from '../middleware/checkAuth.js';
import { deleteDoctorProfile, updateDoctorProfile, viewDoctorProfile } from '../controllers/doctorProfileController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { deleteAdminProfile, updateAdminProfile, viewAdminProfile } from '../controllers/adminProfileController.js';
import { adminViewAllAppointments, adminViewAllDoctors, adminViewAllPatients } from '../controllers/adminView.js';





const router = express.Router()

//Admin
router.post('/register',adminSignUp)
router.post('/adminLogin',adminLogin)
// router.post('/sentOTP',sendOTPController)
// router.post('/verifyOTP',verifyAndUpdatePassword)
// router.post('/forgot-password',forgotPassword)

// Admin Profile
router.get('/viewAdminProfile',checkAuth,viewAdminProfile)
router.put('/updateAdminProfile',checkAuth,updateAdminProfile)
router.delete('/deleteAdminProfile',checkAuth,deleteAdminProfile)
//admin featues
router.get('/adminViewAllDoctors',checkAuth,adminViewAllDoctors)
router.get('/adminViewAllPateints',checkAuth,adminViewAllPatients)
router.get('/adminViewAllAppointments',checkAuth,adminViewAllAppointments)

//Doctor
router.post('/registerDoctor',upload,registerDoctor)
router.post('/loginDoctor',loginDoctor)
router.post('/forgotPasswordDoctor',doctorForgotPassword)
router.post('/doctorResetPassword',doctorResetPassword)

//DoctorAppointment
router.get('/viewPatientAppointment',checkAuth,viewPatientAppointment)
router.put('/updateAppointment/:id',checkAuth,updateAppointmentStatus)
router.delete('/deleteAppointment/:id',checkAuth,deleteAppointment)
router.get('/viewPatients',checkAuth,viewPatients)

// Doctor Profile
router.get('/viewDoctorProfile',checkAuth,viewDoctorProfile)
router.put('/updateDoctorProfile',checkAuth,updateDoctorProfile)
router.delete('/deleteDoctorProfile',checkAuth,deleteDoctorProfile)



router.post("/patientlogin",login)
router.post("/patientregister", signUp);
router.post("/patientforgotPassword",forgotPassword)
router.post("/patientAppointment",checkAuth,patientAppointment)
// router.get("/getAppointment",checkAuth,getAppointment)
router.post("/nurselogin",nurselogin)
router.post("/nurseregister",nursesignUp );
router.post("/nurseforgotPassword",nurseforgotPassword)


export { router }