const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const modelRoutes = require("./modelRoutes");

router.use("/auth", authRoutes);
router.use("/models", modelRoutes);

module.exports = router;
