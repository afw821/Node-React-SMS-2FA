const express = require("express");
const router = express.Router();
const { sendSMS } = require("../controllers/smsController");
router.post("/", sendSMS);

module.exports = router;
