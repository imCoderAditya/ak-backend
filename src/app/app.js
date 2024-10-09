// server.js or app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swaggerConfig.js";
import authRoutes from "../routes/user_routes.js";
import cors from "cors"; // Import cors

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.json());

//Access Public Folder
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);

export default app;
