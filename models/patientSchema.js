import mongoose from "mongoose";

const Schema = mongoose.Schema

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  medicalHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalHistory",
    },
  ],

  appointment: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Appointment" 
  }],

  feedbackreview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeedbackReview",
    },
  ],
  payment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

const medicalSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  allergies: [{ type: String }],
  medicalConditions: [{ type: String }],
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String },
      frequency: { type: String },
      prescribedBy: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
  surgeries: [
    {
      name: { type: String },
      date: { type: Date },
      hospital: { type: String },
      doctor: { type: String },
    },
  ],
  emergencyContact: {
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const paymentSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "UPI", "Cash", "Insurance"],
    required: true,
  },
  transactionId: {
    type: String,
    unique: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed", "Refunded"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
    default: null,
  },
});

const feedbackReviewSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  feedbackDate: {
    type: Date,
    default: Date.now,
  },
});

const appointmentSchema = new Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum: ["Pending", "Confirmed" ,"Cancelled"],
        default: "Pending"
    
    },
    reason:{
        type:String,
    }
},{timestamps:true})

const doctorSchema = new Schema({
    fullName :{
        type: String,
        trim: true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        length: 10,
        unique: true
        
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
    specialty:{
        type:String,
        required:true,
        enum:["Cardiology","Dermatology","Neurology","Pediatrics","Orthopedics"],
    },
    profilePicture:{
        trype:String
    },
    otp :{
      type:String
    },
    otpExpiry:{
        type:Date
    },

    appointments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Appointment" 
    }],

    chats: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Chat" 
    }],

    feedbacks: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Feedback" 
    }],


    payments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Payment" 
    }]
})


const chatSchema = new Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

const Patient = mongoose.model("Patient", PatientSchema);
const MedicalHistory = mongoose.model("MedicalHistory", medicalSchema);
const Doctor = mongoose.model("Doctor",doctorSchema)
const Appointment = mongoose.model("Appointment", appointmentSchema);
const FeedbackReview = mongoose.model("FeedbackReview", feedbackReviewSchema);
const Payment = mongoose.model("Payment", paymentSchema);


const Chat = mongoose.model("Chat", chatSchema);

export { Patient, Doctor, Chat, MedicalHistory, Payment, FeedbackReview, Appointment };
