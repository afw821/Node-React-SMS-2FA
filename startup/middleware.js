const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
module.exports = (app) => {
  app.use(cors({ origin: true, credentials: true }));
  app.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    next();
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "build"))); //for heroku deployment
  }
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // To parse the incoming requests with JSON payloads
  //Right before your app.listen(), add this: for heroku deployment
  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }
};
