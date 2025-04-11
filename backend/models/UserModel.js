import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user", // Default role is 'user'
    },
    // New fields to add to the schema
    age: {
      type: Number,
      required: true, // Age is required
    },
    gender: {
      type: String,
      required:true,
      enum: ["Male", "Female", "Other"], // Define the allowed gender values
    },
    country: {
      type: String,
      required: true, // Country is required
    },
    shippingAddress: {
      street: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Hash password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is new or modified
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash password with 10 salt rounds
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare the plain password with the hashed one
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
