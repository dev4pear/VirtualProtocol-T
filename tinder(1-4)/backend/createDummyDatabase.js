// createDummyDatabase.js

require('dotenv').config();
const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

// MySQL connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// Function to create tables if they don't exist
async function createTablesIfNotExist() {
    try {
        // Create a database connection
        const connection = await mysql.createConnection(dbConfig);

        // Create Users table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        // Create Profiles table if not exists
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS Profiles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                avatar VARCHAR(255),
                gender VARCHAR(10),
                location VARCHAR(255),
                university VARCHAR(255),
                interests VARCHAR(255),
                userId INT,
                FOREIGN KEY (userId) REFERENCES Users(id)
            )
        `);

        // Close the database connection
        await connection.end();

        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
}

// Function to generate random profiles
function generateProfiles(numProfiles) {
    const profiles = [];
    const university = ['MIT', 'Havard University', 'Cambridge University', 'University of New York', 'University of California'];
    const interests = ['Sports', 'Cooking', 'Dancing', 'Reading', 'Hiking', 'Traveling', 'Photography'];
    for (let i = 0; i < numProfiles; i++) {
        const profile = {
            name: faker.person.fullName(),
            userId: i + 1,
            avatar: faker.image.avatar(),
            gender: faker.helpers.arrayElement(['male', 'female']),
            location: faker.location.city(),
            university: faker.helpers.arrayElement(university),
            interests: faker.helpers.arrayElement(interests),
        };
        profiles.push(profile);
    }
    return profiles;
}

// Function to generate random users
async function generateUsers(numProfiles) {
    const users = [];
    for (let i = 0; i < numProfiles; i++) {
        const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);
        const user = {
            email: faker.internet.email(),
            password: hashedPassword,
        };
        users.push(user);
    }
    return users;
}

// Function to insert profiles into the database
async function insertProfiles(profiles) {
    try {
        // Create a database connection
        const connection = await mysql.createConnection(dbConfig);

        // Insert profiles into the 'profiles' table
        for (const profile of profiles) {
            await connection.execute(`INSERT INTO profiles (name, avatar, gender, location, university, interests, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                profile.name,
                profile.avatar,
                profile.gender,
                profile.location,
                profile.university,
                profile.interests,
                profile.userId
            ]);
        }

        // Close the database connection
        await connection.end();

        console.log('Profiles inserted successfully.');
    } catch (error) {
        console.error('Error inserting profiles:', error);
        throw error;
    }
}

// Function to insert users into the database
async function insertUsers(users) {
    try {
        // Create a database connection
        const connection = await mysql.createConnection(dbConfig);

        // Insert users into the 'users' table
        for (const user of users) {
            await connection.execute(`INSERT INTO users (email, password) VALUES (?, ?)`, [
                user.email,
                user.password
            ]);
        }

        // Close the database connection
        await connection.end();

        console.log('Users inserted successfully.');
    } catch (error) {
        console.error('Error inserting users:', error);
        throw error;
    }
}

// Main function to create tables, generate profiles, and insert them into the database
async function main() {
    // Create tables if they don't exist
    await createTablesIfNotExist();

    // Number of profiles to generate
    const numProfiles = 100;

    // Generate random users
    const users = await generateUsers(numProfiles);

    // Insert users into the database
    await insertUsers(users);

    // Generate random profiles
    const profiles = generateProfiles(numProfiles);

    // Insert profiles into the database
    await insertProfiles(profiles);
}

// Execute main function
main();