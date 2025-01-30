import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
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
    match: /^[0-9]{10}$/,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
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
          ref: "Appointment", 
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
const medicalSchema = new mongoose.Schema({
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
const paymentSchema = new mongoose.Schema({
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
const feedbackReviewSchema = new mongoose.Schema({
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
const appointmentSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
});

const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
const FeedbackReview = mongoose.model("FeedbackReview", feedbackReviewSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const MedicalHistory = mongoose.model("MedicalHistory", medicalSchema);
const Patient = mongoose.model("Patient", PatientSchema);
const Chat = mongoose.model("Chat", chatSchema);
export { Patient, Chat, MedicalHistory, Payment, FeedbackReview, Appointment };
