// server.js or app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json" assert { type: "json" };
import authRoutes from "../routes/user_routes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);

//Access Public Folder
app.use(express.static("public"));

export default app;
