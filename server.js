const express = require("express");
const app = express();
//env variables
require("dotenv").config();
//startup
require("./startup/middleware")(app);
require("./startup/routes")(app);
require("./startup/db")(app);
