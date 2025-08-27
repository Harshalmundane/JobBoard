const express = require("express")
const router = express.Router()
const { getProfile, createOrUpdateProfile, deleteProfile, getAllProfiles } = require("../controllers/profileController")

const auth = require("../middleware/auth") // adjust path as needed

router.get("/", getAllProfiles)

router.get("/:userId", auth, getProfile)

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", auth, createOrUpdateProfile)

// @route   DELETE /api/profile/:userId
// @desc    Delete user profile
// @access  Private
router.delete("/:userId", auth, deleteProfile)

module.exports = router
