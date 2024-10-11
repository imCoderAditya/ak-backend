import logger from "../utils/logger.js";
class HttpException extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleHttpException = (error) => {
  if (error instanceof HttpException) {
    logger.error(
      `HTTP Exception: Status Code ${error.statusCode}, Message: ${error.message}`
    );
    // You can handle the exception further, log it, or customize the behavior.
  } else {
    logger.error("Unhandled Exception:", error);
    // Handle other types of exceptions if needed.
  }
};

export { HttpException, handleHttpException };
