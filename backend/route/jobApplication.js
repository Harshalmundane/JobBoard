const express = require("express");
const { 
    applyJob, 
    getAllApplications, 
    getApplicationById, 
    deleteApplication 
} = require("../controllers/JobApplication");

const router = express.Router();

router.post("/applyJob", applyJob);
router.get('/getAllApplications', getAllApplications);
router.get("/application/:id", getApplicationById);
router.delete("/application/:id", deleteApplication);

module.exports = router;
