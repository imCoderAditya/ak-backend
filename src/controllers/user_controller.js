import jwt from "jsonwebtoken";
import User from "../models/user_model.js"; // Include .js extension
import dotenv from "dotenv";

dotenv.config();

// User registration
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const user = new User({ username, password });
    await user.save();

    // Generate a JWT token
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Response including user details and token
    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(404).json({ error: "Server error", details: error.message });
  }
};

// User login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Response including user details and token
    res.json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(404).json({ error: "Server error", details: error.message });
  }
};
