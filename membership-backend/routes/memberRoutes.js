const express = require('express');
const { getAllMembers, createMember } = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.get('/', authMiddleware, getAllMembers);
router.post('/', authMiddleware, upload.single('photo'), createMember);

module.exports = router;
