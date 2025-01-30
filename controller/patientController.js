import { Patient } from "../models/patientSchema.js";
import {  comparedPassword, generateHashedPassword,  } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";
import { validateEmail, validatePassword,} from "../validation/validation.js";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must be between 6 and 20 characters long, contain at least one letter, one number, and one special character.",
      });
    }

    const existingUser = await Patient.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    } else {
      const hashedPassword = await generateHashedPassword(password);

      const newUser = new Patient({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successfully!", user: newUser });
    }
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Patient.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Oops,the user not found.Please signup" });
    }

    const validPassword = await comparedPassword(password, user.password);
    

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid User Information" });
    }
    
    
    const accessToken = generateAccessToken(user.id);
    
    res.status(200).json({
        success: true,
        message: "Login successful",
        user: { name: user.name, email: user.email },
        accessToken,
     });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

export { signUp, login };
