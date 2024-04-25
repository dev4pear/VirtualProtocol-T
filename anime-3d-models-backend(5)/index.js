const express = require("express");
const connectDB = require("./src/config").connectDB;
const routes = require("./src/routes");
const handleErrors = require("./src/utils/errorHandlers");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use(routes);

// Error handling middleware
app.use(handleErrors);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
