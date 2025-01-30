import mongoose from "mongoose";

const Schema = mongoose.Schema

const patientSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password  : {
        type:String,
        trim:true,
        required:true,
        numbers:true,
        length: 8,
        symbol:true,
        excludeSimilarCharacters: true,
        strict: true,

    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    address: {
      type: String,
      required: true
    },
    medicalHistory: [
      {
        diagnosis: String,
        treatment: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
      }
    ],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });


const adminSchema = new Schema({
    adminName : {
        type:String,
        trim:true,
        required:true
    },
    email : {
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password  : {
        type:String,
        trim:true,
        required:true,
        numbers:true,
        length: 8,
        symbol:true,
        excludeSimilarCharacters: true,
        strict: true,

    }
})

const appointmentSchema = new mongoose.Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  

const Admin = mongoose.model("Admin",adminSchema)
const Patient = mongoose.model("Patient",patientSchema)
const Appointment = mongoose.model("Appointment",appointmentSchema)

export { Admin , Patient , Appointment}