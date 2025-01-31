import mongoose from "mongoose";

const Schema = mongoose.Schema

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

const patientSchema = new Schema({
    userName :{
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
        type:Number,
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
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
})

const appointmentSchema = new Schema({
    // patient:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Patient',
    //     required: true
    // },
    doctor:{
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
        enum: ["Pending", "Comfirmed" ,"Cancelled"],
        default: "Pending"
    
    },
    reason:{
        type:String,
    }
},{timestamps:true})

const feedBackSchema = new Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Patient", 
        required: true
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Doctor", 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: true 
    },
    comment: { 
        type: String 
    }
});

const ChatSchema = new mongoose.Schema({
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

const PaymentSchema = new Schema({
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Doctor", 
        required: true 
    },
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Patient", 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Completed", "Failed"], 
        default: "Pending" },
    date: { 
        type: Date, 
        default: Date.now }
});

const Doctor = mongoose.model("Doctor",doctorSchema)
const Patient = mongoose.model("Patient",patientSchema)
const Appointment = mongoose.model("Appointment",appointmentSchema)
const FeedBack = mongoose.model("FeedBack",feedBackSchema)
const Chat = mongoose.model("Chat",ChatSchema)
const Payment = mongoose.model("Payment",PaymentSchema)

export { Doctor, Patient, Appointment, FeedBack, Chat, Payment }