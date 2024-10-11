import jwt from "jsonwebtoken";
import User from "../models/user_model.js"; // Include .js extension
import dotenv from "dotenv";
import { BadRequestError, InternalServerError } from "../utils/error.js";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";
dotenv.config();

// User registration function
export const register = async (req, res, next) => {
  const { name, email, mobile, gender, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    // Create a new user
    const user = new User({ name, email, mobile, gender, password });
    await user.save();

    // Generate a JWT token
    const accessToken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Respond with the user details and token
    sendSuccessResponse(
      res,
      {
        accessToken,
        user: user,
      },
      "User registered successfully",
      HttpStatusCodes.CREATED
    );
  } catch (error) {
    if (error instanceof BadRequestError) {
      sendErrorResponse(res, HttpStatusCodes.BAD_REQUEST, error.message);
    } else {
      // For unexpected errors, log them and send a generic server error response
      next(
        new InternalServerError(
          "An error occurred while registering the user",
          error.message
        )
      );
    }
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
      process.env.SECRET_KEY,
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
