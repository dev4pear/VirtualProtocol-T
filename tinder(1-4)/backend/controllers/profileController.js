// controllers/profileController.js

const profileService = require('../services/profileService');

// Controller function to create a new profile
exports.createProfile = async (req, res) => {
    try {
        const { userId, name, gender, location, university, interests } = req.body;
        const profile = await profileService.createProfile(userId, name, gender, location, university, interests);
        res.json({ profile });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get profile by user ID
exports.getProfileByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const profile = await profileService.getProfileByUserId(userId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json({ profile });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
