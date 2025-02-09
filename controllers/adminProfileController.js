import { Admin } from "../models/adminSchema.js"

const viewAdminProfile = async (req, res) => {
    try{
        const adminId = req.user._id

        const admin = await Admin.findById({_id:adminId})

        if(!admin){
            return res.status(404).json({
                message: "Admin Not Found"
            })
        }

        return res.status(200).json({
            message: "View Your Profile Successfully",admin
        })
        
    }
    catch(error){
        return res.status(500).json({
            error:error.message
        })
    }

}

const updateAdminProfile = async (req, res) => {
    try{
        const adminId = req.user._id

        const updatedData =req.body

        const admin = await Admin.findByIdAndUpdate({_id:adminId},updatedData,{new:true})
        
        if(!admin){
            return res.status(404).json({
                message: "Admin Not Found"
            })
        }

        return res.status(200).json({
            message:"Your Profile Updated Successfully",admin
        })

    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

const deleteAdminProfile = async (req, res) => {
    try{

        const adminId = req.user._id

        const admin = await Admin.findByIdAndDelete({_id:adminId})

        if(!admin){
            return res.status(404).json({
                message: "Admin Not Found"
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

export { viewAdminProfile, updateAdminProfile, deleteAdminProfile }