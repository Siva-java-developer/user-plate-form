const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const ResponseHandler = require('../utils/responseHandler');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ResponseHandler.error(res, 'Access denied. No token provided.', 401);
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return ResponseHandler.error(res, 'Invalid token. User not found.', 401);
      }

      if (!user.isActive) {
        return ResponseHandler.error(res, 'Account is deactivated.', 401);
      }

      req.user = user;
      next();
    } catch (jwtError) {
      return ResponseHandler.error(res, 'Invalid token.', 401);
    }
  } catch (error) {
    return ResponseHandler.error(res, 'Authentication failed.', 500);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return ResponseHandler.error(res, 'Access forbidden. Insufficient permissions.', 403);
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};