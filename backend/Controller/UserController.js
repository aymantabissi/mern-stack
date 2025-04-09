// controllers/userController.js
import User from "../models/User";

// Get current user's profile (with data)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user.id from JWT token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update user's profile (address, phone, etc.)
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, telephone, shippingAddress } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        telephone,
        shippingAddress,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
