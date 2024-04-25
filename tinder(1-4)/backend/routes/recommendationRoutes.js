// routes/recommendationRoutes.js

const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Route to get recommendations for a user
router.get('/:userId', recommendationController.getRecommendations);

module.exports = router;
