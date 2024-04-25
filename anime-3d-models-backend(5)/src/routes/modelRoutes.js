const express = require("express");
const router = express.Router();
const modelController = require("../controllers/modelController");
const authenticateToken = require("../utils/authenticateToken");
const fs = require("fs");
const path = require("path");
const Model = require("../models/model");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const anime = req.query.anime;
    if (!anime) throw new Error("Anime name is required.");

    const models = await modelController.getModelsByAnime(anime);
    res.json(models);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to serve .obj files from /models directory
router.get("/items", authenticateToken, async (req, res) => {
  try {
    const modelName = req.query.objName; // Get the model name from the wildcard parameter
    console.log(modelName);
    const modelPath = path.join(
      __dirname,
      "../..",
      "models",
      `${modelName}.obj`
    );
    console.log(modelPath);

    return fs.readFileSync(modelPath, {encoding: 'utf-8'});
  } catch (error) {
    console.error(error);
    res.status(404).send("Model not found");
  }
});

router.get("/:modelName", authenticateToken, async (req, res) => {
  try {
    const modelName = req.params.modelName;
    const model = await Model.findOne({ name: modelName });
    if (!model) throw new Error("Model not found");

    const modelPath = path.join(__dirname, "models", model.modelPath);
    fs.readFile("readMe.txt", "utf8", function (err, data) {
      fs.writeFile("writeMe.txt", data, function (err, result) {
        if (err) console.log("error", err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Model not found");
  }
});

module.exports = router;
