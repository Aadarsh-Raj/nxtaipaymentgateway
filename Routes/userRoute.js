const express = require("express");
const userController = require("../Controllers/userController");
const {authMiddleware} = require("../Middlewares/tokenAuth");
const router = express.Router();

// create user 
router.post("/register", userController.registerUser);

// login user 
router.post("/login", userController.loginUser);

// logout user
router.post("/logout",authMiddleware, userController.logoutUser);
module.exports = router