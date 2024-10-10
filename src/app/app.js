// server.js or app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json" assert { type: "json" };
import authRoutes from "../routes/user_routes.js";
import cors from "cors";
// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:4000",
    "https://https://ak-backend-lime.vercel.app",
  ], // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Enable set cookie
};

const app = express();

// Middleware
app.use(express.json());
// Enable CORS with options
app.use(cors(corsOptions));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);

//Access Public Folder
app.use(express.static("public"));

export default app;
