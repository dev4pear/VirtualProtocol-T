// models/profile.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to create a new profile
exports.createProfile = async (userId, name, gender, location, university, interests) => {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO profiles (userId, name, gender, location, university, interests) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, name, gender, location, university, interests]
        );
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to get profile by user ID
exports.getProfileByUserId = async (userId) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM profiles WHERE userId = ?',
            [userId]
        );
        connection.release();
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Function to get recommendations for a user
exports.getRecommendationsByUserId = async (userId) => {
    try {
        const connection = await pool.getConnection();
        // Add your recommendation logic here

        // Define weights for different attributes
        const weights = {
            gender: 0.3,
            location: 0.2,
            university: 0.2,
            interests: 0.3
        };

        // Generate a random offset for pagination
        const randomOffset = Math.floor(Math.random() * 100); // Assuming 100 profiles in the database

        // Construct SQL query with weighted attributes
        const sqlQuery = `
            SELECT * FROM profiles
            WHERE id != ${userId} -- Exclude the current user
            ORDER BY
                ABS(${weights.gender} * (SELECT gender FROM profiles WHERE id = ${userId}) - gender) +
                ABS(${weights.location} * (SELECT location FROM profiles WHERE id = ${userId}) - location) +
                ABS(${weights.university} * (SELECT university FROM profiles WHERE id = ${userId}) - university) +
                ABS(${weights.interests} * (SELECT interests FROM profiles WHERE id = ${userId}) - interests) 
            ASC
            LIMIT 10
            OFFSET ${randomOffset};
        `;

        const [rows] = await connection.execute(sqlQuery);
        connection.release();
        return rows;
    } catch (error) {
        throw error;
    }
};
