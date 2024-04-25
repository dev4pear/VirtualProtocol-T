const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", (req, res) => {
  // Handle login logic
  const token = authController.generateToken("user");
  res.json({ token });
});

module.exports = router;
