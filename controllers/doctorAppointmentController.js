import { Appointment, Doctor } from "../models/doctorSchema.js"

const getDoctorAppointment = async (req,res) => {
    try{
        const doctorId = req.params.doctorId

        const {patient, date, time, reason} = req.body
        
        const doctor = await Doctor.findById({_id : doctorId})

        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        const appointment = await Appointment.find({doctor:doctorId}).populate("patient")
        // const appoinment  = await Doctor.findOne({patient})

        if(appointment.length === 0){
            return res.status(404).json({
                message: "There is No Appointment"
            })
        }

        const newAppointment = new Appointment({
            doctor:doctorId,
            patient,
            date,
            time,
            reason
        })

        await newAppointment.save()

         // Add the new appointment to the doctor's list of appointments
        doctor.appointments.push(newAppointment._id);
        await doctor.save();

        return res.status(201).json({
            message: "New appointment created successfully",
            appointment: newAppointment
        });
    }
    catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}

const updateAppointmentStatus = async (req,res)=>{
    try{
        const doctor = req.user //which represents the currently logged-in doctor
        const appointmentId = req.params.id
        const { status } = req.body

        const existingDoctor = await Doctor.findById(doctor._id)

        if(!existingDoctor){
            return res 
            .status(404)
            .json({
                message:'Doctor Not Found'
            })
        }

        const appointment = existingDoctor.appointments.find(
            appointment => appointment._id.toString() === appointmentId)

        if(!appointment){
            return res.status(404).json({
                message:"Appoinment Not Found"
            })
        }

        if(!["Pending","Confirmed","Cancelled"].includes(status)){
            return res.status(400).json({
                message:"Invalid status value"
            })
        }
        const updatedAppointment = await Appointment.findByIdAndUpdate({
            _id:appointmentId},
            {status},
            {new:true}  // Ensure the updated document is returned

        )

    
        return res.status(200).json({
            message: "Appointment updated successfully",
            appointment:updatedAppointment
        })


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

const deleteAppointment = async (req,res)=>{
    try{
        const doctor = req.user //which represents the currently logged-in doctor
        const appointmentId = req.params.id

        const existingDoctor = await Doctor.findById(doctor._id)

        if(!existingDoctor){
            return res 
            .status(404)
            .json({
                message:'Doctor Not Found'
            })
        }

        const appointment = existingDoctor.appointments.find(
            appointment => appointment._id.toString() === appointmentId)

        if(!appointment){
            return res.status(404).json({
                message:"Appoinment Not Found"
            })
        }
        existingDoctor.appointments.filter(
            appointment => appointment._id.toString() !== appointmentId)

        await existingDoctor.save()
        
        return res.status(200).json({
            message: "Appointment deleted successfully",
            doctor:existingDoctor.appointments
        })


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

export {getDoctorAppointment, updateAppointmentStatus, deleteAppointment}