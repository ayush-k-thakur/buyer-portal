const express = require("express");
const ctrl = require("./user.controller");

const router = express.Router();

// Define routes for user registration
router.post("/register", ctrl.register);

// Define routes for user login
router.post("/login", ctrl.login);

// Define route for user logout
router.post("/logout", ctrl.logout);

// Define route to get current user info
router.get("/me", ctrl.getMe);

module.exports = router;