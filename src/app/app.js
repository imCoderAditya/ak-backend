// server.js or app.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json" assert { type: "json" };
import authRoutes from "../routes/user_routes.js";
import cors from "cors";

const app = express();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

// Routes
app.use("/api/auth", authRoutes);

//Access Public Folder
app.use(express.static("public"));

export default app;
