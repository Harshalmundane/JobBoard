const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const upload = require("../middleware/upload"); // Handles file upload

const router = express.Router();

// Upload single logo image on register
router.post("/register", upload.single("logo"), register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
