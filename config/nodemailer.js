import nodemailer from 'nodemailer'

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',  // or your email service (e.g., 'smtp.mailtrap.io' or 'smtp.your-provider.com')
      auth: {
        user: process.env.EMAIL_USER, // The email address you're sending from
        pass: process.env.EMAIL_PASS, // The app-specific password (if using Gmail with 2FA enabled)
      },
})

const generateOTP = ()=> {
    return Math.floor(100000 + Math.random() * 900000).toString()
}


export { transporter, generateOTP }