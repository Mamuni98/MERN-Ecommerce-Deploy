const express = require("express");
const authController = require('../controller/auth');
const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);
exports.router = router;