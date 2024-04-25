const Model = require("../models/model");

const getModelsByAnime = async (anime) => {
  return await Model.find({ anime });
};

module.exports = {
  getModelsByAnime,
};
