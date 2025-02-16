import { Admin } from "../models/adminSchema.js";
import { Appointment, Doctor, Patient } from "../models/patientSchema.js";

const adminViewAllDoctors = async(req, res)=>{

    try{
        const adminId  = req.user._id;
        const admin = await Admin.findById(adminId)
        if(!admin){
            return res.status(404).json({
                message:"Admin Not Found"
            })
        }

        const doctors = await Doctor.find()
        return res.status(201).json({
            message:"View All Doctors",doctors
        })
    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }

}

const adminViewAllPatients = async(req, res)=>{

    try{
        const adminId  = req.user._id;
        const admin = await Admin.findById(adminId)
        if(!admin){
            return res.status(404).json({
                message:"Admin Not Found"
            })
        }

        const patients = await Patient.find()
        .populate({
            path:'appointment',
            select:'status date time',
            populate:{
                path:'doctorId',
                select:'fullName'
            }
        })
        return res.status(201).json({
            message:"View All Patients",patients
        })
    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }

}

const adminViewAllAppointments = async(req, res)=>{

    try{
        const adminId  = req.user._id;
        const admin = await Admin.findById(adminId)
        if(!admin){
            return res.status(404).json({
                message:"Admin Not Found"
            })
        }

        const appointments = await Appointment.find()
        .populate({
            path:'patientId',
            select:'name'
        })
        .populate({
            path:'doctorId',
            select:'fullName'
        })
        const formatedAppointment = appointments.map((appointment) => ({
            ...appointment._doc,
            date: new Date(appointment.date).toISOString().split("T")[0], // Converts to YYYY-MM-DD
        }));

        return res.status(201).json({
            message:"View All Appointments",formatedAppointment
        })
        
    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }

}

export { adminViewAllDoctors, adminViewAllPatients, adminViewAllAppointments }