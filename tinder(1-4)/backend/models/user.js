// models/user.js

// Example model representing a user in the database
const mysql = require('mysql2/promise');

// Create MySQL pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to insert a new user into the database
exports.createUser = async (email, password) => {
    try {
        const connection = await pool.getConnection();
        console.log(connection);
        console.log(email, password);
        const [result] = await connection.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );
        console.log(result);
        connection.release();
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to find a user by email and password
exports.findUser = async (email) => {
    console.log(email);
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        connection.release();
        return rows[0];
    } catch (error) {
        throw error;
    }
};
