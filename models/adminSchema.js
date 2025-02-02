import mongoose from "mongoose";

const Schema = mongoose.Schema

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

    },
    otp :{
        type:String
    },
    otpExpiry:{
        type:Date
    }
})

const Admin = mongoose.model("Admin",adminSchema)

export { Admin }