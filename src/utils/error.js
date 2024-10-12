// error.js
import logger from "../utils/logger.js";
class HttpException extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details; // Optional additional error details
  }
}

// Pre-defined common HTTP error classes
class BadRequestError extends HttpException {
  constructor(message = "Bad Request", details = null) {
    super(400, message, details);
  }
}

class NotFoundError extends HttpException {
  constructor(message = "Resource Not Found", details = null) {
    super(404, message, details);
  }
}

class UnauthorizedError extends HttpException {
  constructor(message = "Unauthorized", details = null) {
    super(401, message, details);
  }
}

class ForbiddenError extends HttpException {
  constructor(message = "Forbidden", details = null) {
    super(403, message, details);
  }
}

class InternalServerError extends HttpException {
  constructor(message = "Internal Server Error", details = null) {
    super(500, message, details);
  }
}

const handleHttpException = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const response = {
    success: false,
    error: {
      status: statusCode,
      message: error.message,
      details: error.details || null, // Optional error details
    },
  };

  // Log the error stack trace only in development mode
  if (process.env.NODE_ENV === "development") {
    logger.error(`Error Stack: ${error.stack}`);
  } else {
    logger.error(`Error: ${error.message}`);
  }

  // Send the structured error response
  res.status(statusCode).json(response);
};

export {
  HttpException,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
};
