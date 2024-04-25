// services/profileService.js

const Profile = require('../models/profile');

// Service function to create a new profile
exports.createProfile = async (userId, name, gender, location, university, interests) => {
    try {
        const profile = await Profile.createProfile(userId, name, gender, location, university, interests);
        return profile;
    } catch (error) {
        throw error;
    }
};

// Service function to get profile by user ID
exports.getProfileByUserId = async (userId) => {
    try {
        const profile = await Profile.getProfileByUserId(userId);
        return profile;
    } catch (error) {
        throw error;
    }
};

