// services/recommendationService.js

const Profile = require('../models/profile');

// Service function to get recommendations for a user
exports.getRecommendationsByUserId = async (userId) => {
    try {
        const recommendations = await Profile.getRecommendationsByUserId(userId);
        return recommendations;
    } catch (error) {
        throw error;
    }
};

