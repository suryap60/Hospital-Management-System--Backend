import nodemailer from 'nodemailer'

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', //Explicitly set the SMTP host
  port: 587,              // Port for TLS (StartTLS)
  secure: false,          // Use false for TLS
  auth: {
    user: process.env.EMAIL_USER,  // Your email address (e.g., "youremail@gmail.com")
    pass: process.env.EMAIL_PASSWORD,  // Your app password or email password
  },
  
})

const generateOTP = ()=> {
    return Math.floor(100000 + Math.random() * 900000).toString()
}


export { transporter, generateOTP }