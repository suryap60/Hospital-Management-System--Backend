import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialty: String,
  availability: [{ day: String, timeSlots: [String] }],
});
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor
