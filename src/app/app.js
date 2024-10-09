// server.js or app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swaggerConfig.js";
import authRoutes from "../routes/user_routes.js";
import cors from "cors"; // Import cors

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger UI API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);

//Access Public Folder
app.use(express.static("public"));

export default app;
