import { Nurse } from "../models/nurseSchema.js";
import { comparedPassword, generateHashedPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";
import {  validateEmail, validatePassword } from "../validation/validation.js";


const nursesignUp = async (req, res) => {
    try {
        const { name, email, password, phone, profilePicture,available } = req.body;
        console.log("email:",email)
        if (!validateEmail(email)) {
            return res.status(401).json({ message: "Invalid email format" });
        }
    
        // Validate password format
        if (!validatePassword(password)) {
            return res.status(401).json({
                message: "Password has invalid format.",
            });
        }

        // Check if email already exists
        const existingNurse = await Nurse.findOne({ email });
        if (existingNurse) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Encrypt password
        const hashedPassword = await generateHashedPassword(password);

        // Save new nurse
        const newNurse = new Nurse({ name, email, phone, password: hashedPassword, profilePicture ,available});
        await newNurse.save();

        res.status(201).json({ message: "Nurse registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const nurselogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const nurse = await Nurse.findOne({ email });

    if (!nurse) {
      return res.status(401).json({ message: "Oops, the nurse not found. Please signup" });
    }

    const validPassword = await comparedPassword(password, nurse.password);
    
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid User Information" });
    }
    
    const accessToken = generateAccessToken(nurse.id);
    
    res.status(200).json({ success: true, data: nurse.name, accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const nurseforgotPassword =  async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const nurse = await Nurse.findOne({ email });
    console.log(nurse)
    if (!nurse) {
      return res.status(404).json({ message: 'nurse not found' });
    }

    // Hash the new password before saving it
    const hashedPassword =await generateHashedPassword(newPassword);
    console.log(`hashed ,${hashedPassword}`)
    nurse.password = hashedPassword;
    

    // Save the updated user
    await nurse.save();

    res.status(200).json({ message: 'Password successfully updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password' });
  }
};

export { nursesignUp, nurselogin, nurseforgotPassword };
