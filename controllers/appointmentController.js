import { Appointment } from "../models/doctorSchema.js"

const bookAppointment = async (req, res) => {
    try{
        const {doctor, date, time, reason} = req.body

        // if(!patient){
        //     return res.status(404).json({
        //         message: "Patient Not Found"
        //     })
        // }
        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        const newAppointment = new Appointment({doctor, date, time, reason})
        await newAppointment.save()
        
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