const Profile = require("../model/Profile")

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params

    const profile = await Profile.findOne({ userId }).populate("userId", "name email")

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    res.status(200).json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      userId,
      name,
      avatar,
      location,
      primaryRole,
      yearsOfExperience,
      openToRoles,
      bio,
      website,
      linkedin,
      github,
      twitter,
      workExperience,
      skills,
    } = req.body

    if (!userId || !name || !location || !bio) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: userId, name, location, and bio",
      })
    }

    // Check if profile exists
    let profile = await Profile.findOne({ userId })

    const profileData = {
      name,
      avatar,
      location,
      primaryRole: primaryRole || "Developer", // Default value if not provided
      yearsOfExperience: yearsOfExperience || "1-2 years", // Default value if not provided
      openToRoles,
      bio,
      website,
      linkedin,
      github,
      twitter,
      workExperience: workExperience || [],
      skills: skills || [],
    }

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate({ userId }, profileData, { new: true, runValidators: true }).populate(
        "userId",
        "name email",
      )

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
      })
    } else {
      // Create new profile
      profile = await Profile.create({
        userId,
        ...profileData,
      })

      await profile.populate("userId", "name email")

      res.status(201).json({
        success: true,
        message: "Profile created successfully",
        data: profile,
      })
    }
  } catch (error) {
    console.error("Error creating/updating profile:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// @desc    Delete user profile
// @route   DELETE /api/profile/:userId
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params

    const profile = await Profile.findOneAndDelete({ userId })

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting profile:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// @desc    Get all profiles (for admin or public viewing)
// @route   GET /api/profiles
// @access  Public
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId", "name email").sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    })
  } catch (error) {
    console.error("Error fetching profiles:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  getProfile,
  createOrUpdateProfile,
  deleteProfile,
  getAllProfiles,
}
