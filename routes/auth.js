const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//const authCookie = require("../middleware/authCookie");
const authController = require("../controllers/authController");

router.post("/", authController.login); //"/api/auth"
router.post("/isTokenValid", authController.isTokenValid);
//router.put("/", auth, authController.updatePassword);

module.exports = router;
