// HttpStatusCodes.js

const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409, // Fixed typo
  INTERNAL_SERVER_ERROR: 500, // Fixed the status code to 500
};

export default HttpStatusCodes;
