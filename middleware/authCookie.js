const jwt = require("jsonwebtoken");
//const express_jwt = require("express-jwt");
require("dotenv").config();
const { requiresAuth } = require("../config/authConfig.json");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
module.exports = function (req, res, next) {
  if (!requiresAuth) return next();
  try {
    const { token } = req.cookies;
    console.log("--------req.cookies", req.cookies);
    console.log("------TOKEN-------", token);
    if (!token) return status(401).send("Access Denied. No token Provided");
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    req.user = decoded;
    res.token = token;
    next();
  } catch (ex) {
    res.status(400).send("Invalid access token");
  }
};
