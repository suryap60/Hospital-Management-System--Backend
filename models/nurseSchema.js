import mongoose from "mongoose";
import { Appointment,MedicalHistory } from "./patientSchema.js";
const nurseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    profilePicture: {
        type: String,
    },
    appointment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment", 
    }],
    assignedbed:{
        type: String, 
    },
    medicalHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalHistory",
      }],
    createdAt: {
        type: Date,
        default: Date.now,
    },

});
const Nurse = mongoose.model("Nurse", nurseSchema);
export { Nurse ,MedicalHistory,Appointment};
