import app from "./app/app.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Import URL utilities
import connectDB from "./config/db.js"; // Ensure this is correct

dotenv.config();

const port = process.env.PORT;

// Correct way to get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startServer = async () => {
  try {
    connectDB();

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/welcome.html"));
    });

    app.listen(port, () => {
      logger.warn(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
  }
};

startServer();
