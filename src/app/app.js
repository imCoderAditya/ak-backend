// server.js or app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swaggerConfig.js";
import authRoutes from "../routes/user_routes.js";

const app = express();

// Middleware
app.use(express.json());

//Access Public Folder
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

// Routes
app.use("/api/auth", authRoutes);

export default app;
