import { Patient } from "../models/patientSchema.js";
import { comparedPassword, generateHashedPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";
import { validateEmail, validateMobileNumber, validatePassword } from "../validation/validation.js";


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

          if(!validateMobileNumber(phone)){
            return res.status(400).json({
                message: "Enter a Valid 10-digit Number"
            })
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

        res.status(201).json({ message: "Patient registered successfully!" ,newPatient});
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
    
    res.status(200).json({ success: true, data: patient, accessToken });
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


export { signUp,login,forgotPassword}