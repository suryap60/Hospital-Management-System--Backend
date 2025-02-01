import { Patient } from "../models/patientSchema.js";
import { comparedPassword, generateHashedPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";
import { validateEmail, validatePassword } from "../validation/validation.js";
import { Appointment } from "../models/patientSchema.js";

const signUp = async (req, res) => {
    try {
        const { name , email, password, phone ,dateOfBirth, age, gender,medicalHistory,feedbackreview,payment,chat} = req.body;

        if (!validateEmail(email)) {
            return res.status(401).json({ message: "Invalid email format" });
          }
      
          // Validate password format
          if (!validatePassword(password)) {
            return res.status(401).json({
              message: "Password must be between 6 and 20 characters long, contain at least one letter, one number, and one special character.",
            });
          }

        // Check if email already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Encrypt password
        const hashedPassword = await generateHashedPassword(password);

        // Save new patient
        const newPatient = new Patient({ name, email, phone, password: hashedPassword ,dateOfBirth, age, gender,medicalHistory,feedbackreview,payment,chat });
        await newPatient.save();

        res.status(201).json({ message: "Patient registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(401).json({ message: "Oops,the patient not found.Please signup" });
    }

    const validPassword = await comparedPassword(password, patient.password);
    

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid User Information" });
    }
    
    
    const accessToken = generateAccessToken(patient.id);
    
    res.status(200).json({ success: true, data: patient.name, accessToken });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

const forgotPassword =  async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    console.log(patient)
    if (!patient) {
      return res.status(404).json({ message: 'patient not found' });
    }

    // Hash the new password before saving it
    const hashedPassword =await generateHashedPassword(newPassword);
    console.log(`hashed ,${hashedPassword}`)
    patient.password = hashedPassword;
    

    // Save the updated user
    await patient.save();

    res.status(200).json({ message: 'Password successfully updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password' });
  }
};



// Book Appointment
 const bookAppointment = async (req, res) => {
  const { doctorId, date, time } = req.body;

  try {
    const appointment = new Appointment({
      patientId: req.patient.id,
      doctorId,
      date,
      time,
      status: "Pending",
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get appointment
const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id }).populate("doctorId", "name specialty");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { signUp,login,forgotPassword,bookAppointment,getAppointment}