import { Appointment, Doctor, Patient } from "../models/patientSchema.js";

const patientAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const { patientId } = req.params;

    // Check if Patient exists
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res
        .status(403)
        .json({
          message: "Unauthorized. Only patients can book appointments.",
        });
    }

    // Check if Doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    // Check for duplicate booking
    const existingAppointment = await Appointment.findOne({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "You already have an appointment at this time." });
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
    
    doctor.appointments.push(newAppointment._id);
    await doctor.save();

    patient.appointment.push(newAppointment._id);
    await patient.save();

    res
      .status(201)
      .json({
        message: "Appointment booked successfully!",
        appointment: newAppointment,
      });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export default patientAppointment;
