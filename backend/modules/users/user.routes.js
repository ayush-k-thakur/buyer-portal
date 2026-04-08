const express = require("express");
const ctrl = require("./user.controller");

const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.get("/me", ctrl.getMe);

module.exports = router;