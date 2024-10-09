import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    logger.info("MongoDB Connected Successfully");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Optional: Stops the server if DB connection fails
  }
};

export default connectDB;
