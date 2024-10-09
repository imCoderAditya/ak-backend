import app from "./app/app.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Import URL utilities
import connectDB from "./config/db.js"; // Ensure this is correct

dotenv.config();

const port = process.env.PORT;

// Get the current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectDB().then(() => {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Test endpoint
   *     responses:
   *       200:
   *         description: Successful response
   */
  // Swagger UI setup
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/welcome.html"));
  });
});

app.listen(port, () => {
  logger.warn(`Server started on port http://localhost:${port}`);
});
