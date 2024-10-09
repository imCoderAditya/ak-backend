import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../utils/logger.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adsharmavashishtha:xZQW1rjAuj9EQTp9@cluster0.p578p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    logger.info("MongoDB Connected Successfully");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Optional: Stops the server if DB connection fails
  }
};

export default connectDB;
