
const express = require("express");
const router = express.Router();
const { postJob, getAllJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");
const authMiddleware = require("../middleware/auth");

// Routes
router.post("/jobPost", authMiddleware, postJob); // Protected route to post a new job
router.get("/", getAllJobs); // Public route to get all jobs
router.get("/:id", authMiddleware, getJobById); // Protected route to get a single job by ID
router.patch("/:id", authMiddleware, updateJob); // Protected route to update a job
router.delete("/:id", authMiddleware, deleteJob); // Protected route to delete a job

module.exports = router;