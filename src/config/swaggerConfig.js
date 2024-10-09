// config/swaggerConfig.js
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for user authentication",
    },
    servers: [
      {
        url: "https://ak-backend-lime.vercel.app", // Change this if needed
      },
    ],
  },
  // apis: ["./src/app/*.js", "./src/routes/*.js", "./src/**/*.js"], // Path to the API documentation comments
  apis: ["/src/**/*.js"], // Path to the API documentation comments
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
