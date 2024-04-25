// authController.js

const authService = require("../services/authService");

// Controller function for user login
exports.login = async (req, res) => {
  try {
    // Call authService to handle login logic
    const token = await authService.login(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function for user registration
exports.register = async (req, res) => {
  try {
    // Call authService to handle registration logic
    await authService.register(req.body.email, req.body.password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
