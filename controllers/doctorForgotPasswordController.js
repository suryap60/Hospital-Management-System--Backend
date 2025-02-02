import { Doctor } from "../models/patientSchema.js";
import nodemailer from 'nodemailer'

// 1. First, let's create a simple function to generate a 6-digit OTP
function generateOTP() {
    // This will create a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
}

// 2. Function to send email
const sendEmail = async (email, otp) => {
    // Setup email sender (like Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    // Send the email with OTP
    await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}`
    });
};

// 3. When user requests for OTP (First API)
const sendOTPControllerDoctor = async (req, res) => {
    try {
        // Get email from request
        const { email } = req.body;

        // Check if admin exists
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Generate OTP
        const newOTP = generateOTP();

        // Save OTP in database with expiry time (5 minutes from now)
        doctor.otp = newOTP;
        doctor.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // Current time + 5 minutes
        await doctor.save();

        // Send OTP to email
        await sendEmail(email, newOTP);

        res.json({ message: "OTP sent to your email" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. When user submits OTP and new password (Second API)
const verifyAndUpdatePassword = async (req, res) => {
    try {
        // Get data from request
        const { email, otp, newPassword } = req.body;

        // Find admin
        const doctor = await Doctor.findOne({ email });

        // Check if OTP matches and is not expired
        if (!doctor || doctor.otp !== otp || Date.now() > doctor.otpExpiry) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Update password
        doctor.password = await generateHashedPassword(newPassword);
        
        // Clear OTP
        doctor.otp = null;
        doctor.otpExpiry = null;
        
        await doctor.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {sendOTPControllerDoctor, verifyAndUpdatePassword}