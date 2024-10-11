// response.js

// Success response handler
const sendSuccessResponse = (
  res,
  data,
  message = "Request successful",
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Error response handler
const sendErrorResponse = (res, statusCode, message, details = null) => {
  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
      details, // Optional error details
    },
  });
};

// Paginated response handler
const sendPaginatedResponse = (
  res,
  data,
  pagination,
  message = "Request successful"
) => {
  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      totalItems: pagination.totalItems,
      totalPages: pagination.totalPages,
      currentPage: pagination.currentPage,
      pageSize: pagination.pageSize,
    },
  });
};

// Example usage of metadata
const sendResponseWithMetadata = (
  res,
  data,
  metadata,
  message = "Request successful"
) => {
  res.status(200).json({
    success: true,
    message,
    data,
    metadata, // Additional context or metadata
  });
};

export {
  sendSuccessResponse,
  sendErrorResponse,
  sendPaginatedResponse,
  sendResponseWithMetadata,
};
