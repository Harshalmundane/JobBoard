const express = require("express");
const { 
    applyJob, 
    getAllApplications, 
    getApplicationById, 
    deleteApplication 
} = require("../controllers/JobApplication");

const router = express.Router();

// Route for applying for a job
router.post("/applyJob", applyJob);
router.get('/getAllApplications', getAllApplications);

// Route to get a single job application by ID
router.get("/application/:id", getApplicationById);

// Route to delete a job application
router.delete("/application/:id", deleteApplication);

module.exports = router;
