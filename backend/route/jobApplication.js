
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    applyJob,
    getAllApplications,
    getApplicationById,
    deleteApplication,
    getApplicationsForMyJobs,
    updateApplicationStatus,
} = require("../controllers/JobApplication");
const authMiddleware = require("../middleware/auth");

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Routes
router.post("/apply", authMiddleware, upload.single("resume"), applyJob);
router.get("/", authMiddleware, getAllApplications);
router.get("/my-jobs", authMiddleware, getApplicationsForMyJobs);
router.get("/:id", authMiddleware, getApplicationById);
router.delete("/:id", authMiddleware, deleteApplication);
router.patch("/:applicationId/status", authMiddleware, updateApplicationStatus);

module.exports = router;