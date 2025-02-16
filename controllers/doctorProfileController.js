import { Doctor } from "../models/patientSchema.js"
// import { generateHashedPassword } from "../utils/bcrypt.js"

const viewDoctorProfile = async (req, res) => {
    try{
        const doctorId = req.user._id

        const doctor = await Doctor.findById({_id:doctorId})

        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        return res.status(200).json({
            message: "View Your Profile Successfully",doctor
        })
        
    }
    catch(error){
        return res.status(500).json({
            error:error.message
        })
    }

}

const updateDoctorProfile = async (req, res) => {
    try{
        const doctorId = req.user._id

        const updatedData = req.body

        //  // If a new password is provided, hash it
        // if(updatedData.password){
        //     const hashedPassword = await generateHashedPassword(updatedData.password);
        //     updatedData.password = hashedPassword
        // }else {
        //     // If no new password is provided, remove it from the update data to prevent overwriting
        //     delete updatedData.password;
        // }

        const doctor = await Doctor.findByIdAndUpdate({_id:doctorId},updatedData,{new:true})
        
        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        return res.status(200).json({
            message:"Your Profile Updated Successfully",doctor
        })

    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

const deleteDoctorProfile = async (req, res) => {
    try{

        const doctorId = req.user._id

        const doctor = await Doctor.findByIdAndDelete({_id:doctorId})

        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        return res.status(200).json({
            message:"Your Profile Deleted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

export { viewDoctorProfile, updateDoctorProfile, deleteDoctorProfile }