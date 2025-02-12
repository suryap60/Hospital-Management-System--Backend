import { Doctor } from "../models/patientSchema.js";
import { path, select } from "framer-motion/client";

const viewPatients = async (req,res) => {
    try{
        const doctorId = req.user._id
        
        const doctor = await Doctor.findById({_id : doctorId})
        .populate({
            path: 'appointments', // This will populate the appointments field
            // match: { doctor: doctorId }, // Ensure appointments belong to the logged-in doctor
            populate:{
                path: 'patientId',
                select:'name email phone age gender',// Fetch essential patient details  
                populate:[
                    { 
                        path:'medicalHistory', 
                        select:'medicalConditions medications surgeries emergencyContact'
                    },
                    { 
                        path:'appointment', 
                        select:'date time status',
                        match:{doctor:doctorId}
                    },
                    { 
                        path:'feedbackreview' ,
                        select:'rating comment feedbackDate' , 
                        match: {doctor:doctorId}
                    },
                    { 
                        path:'chat', 
                        select: 'message timestamp', 
                        match:{ doctor:doctorId}
                    },
                    { 
                        path:'payment', 
                        select: 'amount date', 
                        match:{ doctor:doctorId}
                    }
               ],
            } ,
        })
        .exec()

        if(!doctor){
            return res.status(404).json({
                message: "Doctor Not Found"
            })
        }

        const patients = doctor.appointments.map(app => ({
            name: app.patientId.name,
            age:app.patientId.age,
            gender:app.patientId.gender,
            phone: app.patientId.phone,
            appointment: app.status || "No Available Appointment",
            medicalHistory: app.patientId.medicalHistory || "No history available",
            feedbackreview: app.patientId.feedbackreview || "No feedback",
            payment: app.patientId.payment ?.[0]?.amount || "Not paid",
            chat: app.patientId.chat || "No messages",
        }))

        if(patients.length == 0 ){
            return res.status(404).json({
                message:"No Patient found for the doctor"
            })
        }

        return res.status(201).json({
            message: "All Patients",
            doctor:doctor.fullName,
            patients:patients
        });
    }
    catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}

export { viewPatients }