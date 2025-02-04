import { Appointment, Doctor } from "../models/patientSchema.js"

const getPatientAppointment = async (req,res) => {
    try{
        const doctorId = req.params.id
        
        const doctor = await Doctor.findById({_id : doctorId})
        .populate({
            path: 'appointments', // This will populate the appointments field
            }).exec()

        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        
        // Check if the doctor has any appointments
        const appointments = doctor.appointments;
        
        // const appoinment  = await Doctor.findOne({patient})
        console.log("Appointments found:", appointments.length);  // Debugging log to check how many appointments were found


        if(appointments.length === 0){
            return res.status(404).json({
                message: "There is No Appointment"
            })
        

        }

        return res.status(201).json({
            message: "All appointments",
            doctor:doctor.fullName,
            appointment: appointments
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
        .populate({
            path: 'appointments', // This will populate the appointments field
            }).exec()

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

        const updatedAppointment = await Appointment.findById({
            _id:appointmentId},
            // {status},
            // {new:true}  // Ensure the updated document is returned

        )
        if (!updatedAppointment) {
            return res.status(404).json({
                message: "Appointment Not Found"
            })
        }

        updatedAppointment.status = status;
        await updatedAppointment.save();


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
        .populate({
            path: 'appointments', // This will populate the appointments field
            }).exec()

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

        const appointmentToDelete = await Appointment.findById(appointmentId);
        if (appointmentToDelete) {
            await Appointment.findByIdAndDelete(appointmentId);
        }

        existingDoctor.appointments = existingDoctor.appointments.filter(
            appointment => appointment._id.toString() !== appointmentId
        );

        await existingDoctor.save()
        
        return res.status(200).json({
            message: "Appointment deleted successfully",
            doctorappointments:existingDoctor.appointments
        })


    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

export {getPatientAppointment, updateAppointmentStatus, deleteAppointment}