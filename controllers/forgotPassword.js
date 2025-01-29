import { Admin } from "../middleware/adminSchema.js"
import { generateHashedPassword } from "../utils/bcrypt.js"

const forgotPassword = async(req , res)=>{
    try{

        const { email , newPassword } = req.body

        const admin = await Admin.findOne({email})

        if(!admin){
            return res.status(404).json({
                message:"Admin Not Found"
            })
        }

        const hashedPassword = await generateHashedPassword(newPassword);
        admin.password = hashedPassword
        await admin.save()

        return res.status(200).json({message:"Password Updated Successfully",admin:admin})


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

export {forgotPassword}