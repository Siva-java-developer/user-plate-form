const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteAccount
} = require('../controllers/userController');

const { authenticate, authorize } = require('../middlewares/auth');
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  handleValidationErrors
} = require('../middlewares/validation');

// Public routes
router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);

// Protected routes
router.use(authenticate); // All routes below this middleware require authentication

router.get('/profile', getProfile);
router.put('/profile', updateProfileValidation, handleValidationErrors, updateProfile);
router.put('/change-password', changePasswordValidation, handleValidationErrors, changePassword);
router.delete('/profile', deleteAccount);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);

module.exports = router;