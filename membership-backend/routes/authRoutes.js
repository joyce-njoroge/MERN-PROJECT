const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
//const authController = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
//router.post('/api/auth/refresh-token', authController.refreshToken); // Added this line

module.exports = router;
