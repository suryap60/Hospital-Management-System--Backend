import express from 'express'
import { forgotPassword, login, signUp } from '../controller/patientController.js';
import { nurseforgotPassword, nurselogin, nursesignUp } from '../controller/nurseController.js';

const router = express.Router()

router.post("/patientlogin",login)
router.post("/patientregister", signUp);
router.post("/patientforgotPassword",forgotPassword)
router.post("/nurselogin",nurselogin)
router.post("/nurseregister",nursesignUp );
router.post("/nurseforgotPassword",nurseforgotPassword)

export { router }