// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Route to create a new profile
router.post('/', profileController.createProfile);

// Route to get profile by user ID
router.get('/:userId', profileController.getProfileByUserId);

module.exports = router;
