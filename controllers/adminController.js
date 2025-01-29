import { Admin } from "../middleware/adminSchema.js"
import {comparedPassword, generateHashedPassword } from "../utils/bcrypt.js"
import { generateAccessToken } from "../utils/jwt.js"
import { validateEmail, validatePassword } from "../validation/validation.js"


const adminSignUp = async (req , res) => {
    try{
        const { adminName , email , password } = req.body

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

        const existingAdmin = await Admin.findOne({email})

        if(existingAdmin){
            return res.status(409).json({
                message:"*This Email is already existing"
            })
        }

        const hashedPassword = await generateHashedPassword(password);
        
        const newAdmin = new Admin({ adminName, email, password: hashedPassword });
        await newAdmin.save();
  
        res
          .status(201)
          .json({ message: "Admin created successfully!",  user: newAdmin });
      }

 

    catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

const adminLogin = async(req, res) => {
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

        const admin = await Admin.findOne({email})

        if(email !== "admin@gmail.com"){
            return res.status(404).json({
                message:"Email does not exist"
            })
        }
        
        const validPassword =await comparedPassword(
            password,
            admin.password)

        if(!validPassword){
            return res
            .status(400)
            .json({message:"Password is incorrect"})
        }

        const accessToken = generateAccessToken(admin._id)

        return res
        .status(200)
        .json({message:"User Login Successfully",user:admin,accessToken})
        


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}


export { adminSignUp , adminLogin}