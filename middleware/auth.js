const jwt = require("jsonwebtoken");
const { requiresAuth } = require("../config/authConfig.json");

module.exports = function (req, res, next) {
  if (!requiresAuth) return next();
  try {
    //const token = req.header("x-auth-token");
    const { token } = req.body;

    if (!token) return res.status(401).send("Access denied. No token provided");
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    req.user = decoded;
    res.token = token;
    next();
  } catch (ex) {
    res.status(400).send("Invalid access token");
  }
};
