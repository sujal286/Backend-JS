class ApiError extends Error {
  constructor(
    statusCode, 
    message="An error occurred while processing your request",
    error=[],
    statck=""
) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.suces = false;
    this.error = error;

    if (statck) {
        this.stack = statck;
    } else {
        Error.captureStackTrace(this, this.constructor);
  }
}

export  {ApiError};