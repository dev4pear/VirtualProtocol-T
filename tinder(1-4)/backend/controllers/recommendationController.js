// controllers/recommendationController.js

const recommendationService = require('../services/recommendationService');

// Controller function to get recommendations for a user
exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.params.userId;
        const recommendations = await recommendationService.getRecommendationsByUserId(userId);
        res.json({ recommendations });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
