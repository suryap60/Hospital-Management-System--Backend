import { generateOTP, transporter } from "../config/nodemailer.js"
import { Doctor } from "../models/patientSchema.js"
import { validateEmail } from "../validation/validation.js"



const doctorForgotPassword  = async(req, res) => {
    try{
        const { email } = req.body

        if(!validateEmail(email)){
            return res.status(400).json({
                message :"Invalid Email"
            })
        }

        const normalizedEmail = email.toLowerCase()
        const user = await Doctor.findOne({email:normalizedEmail})

        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        const otp = generateOTP();
        user.otp = otp ;
        user.otpExpiry = Date.now() + 600000 // OTP valid for 10 minutes
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
          };

        transporter.sendMail(mailOptions, (error,info) =>{
            if(error){
                console.error('Error sending OTP email:', error);
                return res.status(500).json({ 
                    message: 'Failed to send OTP' 
                });
            }
            res.status(200).json({ 
                message: 'OTP sent successfully' 
            });
        })


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

const doctorResetPassword = async(req,res) => {
    try {
        const { email, otp, newPassword } = req.body

        if(!validateEmail(email)){
            return res.status(400).json({
                message :"Invalid Email"
            })
        }

        const normalizedEmail = email.toLowerCase()

        const user = await Doctor.findOne({
            email:normalizedEmail, 
            otp,
            otpExpiry:{
                $gt : Date.now()
            }
        })

        if(!user){
            return res.status(404).json({
                message:"Invalid or Expired OTP"
            })
        }

        user.password = newPassword;
        user.otp = undefined ;
        user.otpExpiry = undefined;
        await user.save();

        return res.status(200).json({
            message:"Password Reset Successfully"
        })
    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

export { doctorForgotPassword, doctorResetPassword }