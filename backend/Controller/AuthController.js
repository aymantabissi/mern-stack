import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    try {
      const { name, email, password, role , country , age ,gender  } = req.body;
  
      // Password hash
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Check if user exists (optional)
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create new user with default role or the provided role
      const newUser = new User({
        name,
        email,
        age,
        gender,
        country,
        password: hashedPassword,
        role: role || "user", // Default to "user"
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong during registration" });
    }
  };
  

  export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;  // Use email here
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: `User not found with email: ${email}` });
        }

        // Compare provided password with stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password incorrect" });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send response with token
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

