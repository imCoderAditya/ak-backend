import jwt from "jsonwebtoken";
import User from "../models/user_model.js"; // Include .js extension
import dotenv from "dotenv";
import { BadRequestError, InternalServerError } from "../utils/error.js";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";

dotenv.config();

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

    // Create a user object without the password
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    // Respond with the user details and token
    sendSuccessResponse(
      res,
      {
        accessToken,
        user: userWithoutPassword,
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If the user is not found or the password doesn't match
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // Generate a JWT token
    const accessToken = jwt.sign(
      { id: user._id, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    // Create a user object without the password
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    // Use the success response utility to return the accessToken and user data
    sendSuccessResponse(
      res,
      {
        accessToken,
        user: userWithoutPassword,
      },
      "User Login successfully"
    );
  } catch (error) {
    // Handle different error types
    if (error instanceof UnauthorizedError) {
      sendErrorResponse(res, HttpStatusCodes.UNAUTHORIZED, error.message); // Send a structured 401 error response
    } else {
      // Catch other server errors
      const internalError = new InternalServerError(
        "Server error",
        error.message
      );
      sendErrorResponse(
        res,
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        internalError.message,
        internalError.details
      );
    }
  }
};
