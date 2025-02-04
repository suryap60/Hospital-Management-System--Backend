import { Appointment, Doctor, Patient } from "../models/patientSchema.js";

const patientAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body; // Extract details from request body
    const patientId = req.user._id; // Always use logged-in user's ID

    // Check if Patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Ensure only patients can book appointments
    // If you don't have a role field, simply proceed with the patient check
    if (!patient) {
      return res.status(403).json({ message: "Unauthorized. Only patients can book appointments." });
    }

    // Check required fields
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "Doctor ID, date, and time are required." });
    }

    // Check if Doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Check for duplicate booking
    const existingAppointment = await Appointment.findOne({ patient: patientId, doctor: doctorId, date, time });
    if (existingAppointment) {
      return res.status(400).json({ message: "You already have an appointment at this time." });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      reason,
      status: "Pending",
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });

  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export default patientAppointment;
