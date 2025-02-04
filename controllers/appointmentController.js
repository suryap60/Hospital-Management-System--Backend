import { Appointment, Doctor, Patient } from "../models/patientSchema.js"

const bookAppointment = async (req, res) => {
    try{
        const patientId = req.params.id
        const {doctorId, date, time, reason} = req.body

        const patient= await Patient.findById({_id:patientId})

        const doctor = await Doctor.findById({_id:doctorId})
        if(!patient){
            return res.status(404).json({
                message: "Patient Not Found"
            })
        }

        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        const newAppointment = new Appointment({patientId:patient._id,doctorId:doctor._id, date, time, reason})
        await newAppointment.save()

        doctor.appointments.push(newAppointment._id)
        await doctor.save()

        patient.appointment.push(newAppointment._id)
        await patient.save()
        
        return res.status(201).json({
            message: "Appointment booked successfully",
            appointment:newAppointment
        })
    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}



export { bookAppointment }