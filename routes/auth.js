const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
//const authCookie = require("../middleware/authCookie");
const authController = require("../controllers/authController");

router.post("/firstLevelAuth", authController.firstLevelAuth); //"/api/auth"
router.post("/secondLevelAuth/:id", authController.secondLevelAuth); //"/api/auth"
router.post("/isTokenValid", authController.isTokenValid);
router.post("/forgotPassword/:userId", authController.updateForgetPw);
router.put("/", auth, authController.updatePassword);

module.exports = router;
