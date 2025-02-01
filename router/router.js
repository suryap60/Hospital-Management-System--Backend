import express from 'express'
import { bookAppointment, forgotPassword, getAppointment, login, signUp } from '../controllers/patientController.js';
import { nurseforgotPassword, nurselogin, nursesignUp } from '../controllers/nurseController.js';
import checkauth from '../middleware/checkAuth.js';

const router = express.Router()

router.post("/patientlogin",login)
router.post("/patientregister", signUp);
router.post("/patientforgotPassword",forgotPassword)
router.post("/bookAppointment",checkauth,bookAppointment)
router.get("/getAppointment",checkauth,getAppointment)
router.post("/nurselogin",nurselogin)
router.post("/nurseregister",nursesignUp );
router.post("/nurseforgotPassword",nurseforgotPassword)

export { router }