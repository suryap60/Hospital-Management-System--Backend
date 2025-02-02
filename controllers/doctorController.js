import { Doctor } from "../models/patientSchema.js"
import { comparedPassword, generateHashedPassword } from "../utils/bcrypt.js"
import { generateAccessToken } from "../utils/jwt.js"
import { validateEmail, validateMobileNumber, validatePassword } from "../validation/validation.js"

const registerDoctor = async (req, res) => {

    const allowedSpecialities = ["Cardiology","Dermatology","Neurology","Pediatrics","Orthopedics"]

    try{
        const { fullName ,email, phone, password, specialty } = req.body
        const profilePicture = req.file ? req.file.path : null

        if(!allowedSpecialities.includes(specialty)){
            return res.status(400).json({
                message:"Invalid speciality selected"
            })
        }

        if(!validateEmail(email)){
            return res.status(400).json({
                message: "Enter a Valid Email"
            })
        }

        if(!validatePassword(password)){
            return res.status(400).json({
                message:"Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character."
            })
        }

        if(!validateMobileNumber(phone)){
            return res.status(400).json({
                message: "Enter a Valid 10-digit Number"
            })
        }

        const normalizedEmail = email.toLowerCase()

        const doctor = await Doctor.findOne({email:normalizedEmail})

        if(doctor){
            return res.status(409).json({
                message: "This email is already registered"
            })
        }

        const hashedPassword = await generateHashedPassword(password)

        const newDoctor = new Doctor({ fullName, email:normalizedEmail, phone, password:hashedPassword, specialty, profilePicture })

        await newDoctor.save()

        return res.status(201).json({
            message: "Registration completed successfully!",doctor:newDoctor
        })

    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}


const loginDoctor = async(req, res) => {
    try{
        const { email, password } = req.body

        if(!validateEmail(email)){
            return res.status(400).json({
                message:"Enter a valid Email"
            })
        }
        if(!validatePassword(password)){
            return res.status(400).json({
                message:"Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character."
            })
        }

        const normalizedEmail = email.toLowerCase() 

        const doctor = await Doctor.findOne({email:normalizedEmail})

        if(!doctor){
            return res.status(404).json({
                message:"Email does not exist"
            })
        }
        
        const validPassword =await comparedPassword(
            password,
            doctor.password)

        if(!validPassword){
            return res
            .status(400)
            .json({message:"Password is incorrect"})
        }

        const accessToken = generateAccessToken(doctor._id)

        return res
        .status(200)
        .json({message:"Login Successfully",doctor:doctor,accessToken})
        


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}


const forgotPasswordDoctor = async(req , res)=>{
    try{

        const { email , newPassword } = req.body

        const normalizedEmail = email.toLowerCase()

        const doctor = await Doctor.findOne({email:normalizedEmail})

        if(!doctor){
            return res.status(404).json({
                message:"Email does not exist"
            })
        }

        const hashedPassword = await generateHashedPassword(newPassword);
        doctor.password = hashedPassword
        await doctor.save()

        return res.status(200).json({message:"Password Updated Successfully",doctor:doctor})


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}



export { registerDoctor, loginDoctor, forgotPasswordDoctor }