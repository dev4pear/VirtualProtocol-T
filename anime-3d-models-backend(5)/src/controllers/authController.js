const jwt = require("jsonwebtoken");

const generateToken = (username) => {
  const user = { name: username };
  return jwt.sign(user, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
};
