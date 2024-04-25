// authService.js

// Sample service for authentication logic

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Service function for user login
exports.login = async (email, password) => {
    // Find user by email
    const user = await User.findUser(email);
    if (!user) throw new Error('User not found');

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
    return token;
};

// Service function for user registration
exports.register = async (email, password) => {
    // Check if user already exists
    const existingUser = await User.findUser(email);
    if (existingUser) throw new Error('Email already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.createUser(email, hashedPassword);
};
