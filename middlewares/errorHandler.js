const ResponseHandler = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    return ResponseHandler.error(res, 'Validation failed', 400, errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return ResponseHandler.error(res, `${field} '${value}' already exists`, 400);
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return ResponseHandler.error(res, 'Invalid resource ID', 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ResponseHandler.error(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return ResponseHandler.error(res, 'Token expired', 401);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  ResponseHandler.error(res, message, statusCode);
};

const notFound = (req, res, next) => {
  ResponseHandler.error(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = {
  errorHandler,
  notFound
};