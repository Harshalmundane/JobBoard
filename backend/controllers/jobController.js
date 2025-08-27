
const mongoose = require("mongoose");
const Job = require("../model/job");
const JobApplication = require("../model/JobApplication");

// POST job
const postJob = async (req, res) => {
    try {
        const { title, company, location, description, salary, jobType, experience, category } = req.body;
        const user_id = req.user?._id || req.user?.id;

        // Validate required fields
        if (!title || !company || !salary || !user_id) {
            return res.status(400).json({ error: "Title, company, salary, and user_id are required." });
        }

        // Validate salary is a number
        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({ error: "Salary must be a positive number." });
        }

        const newJob = new Job({
            title,
            company,
            location,
            description,
            salary: Number(salary),
            jobType: jobType || "Full-time",
            experience: experience || "Mid-level",
            category: category || "General",
            user_id,
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ error: "Failed to post job", message: error.message });
    }
};

// GET all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("user_id", "username email logo");
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch jobs", message: error.message });
    }
};

// GET job by ID
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid job ID format." });
        }

        const job = await Job.findById(id).populate("user_id", "username email logo");

        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        // Allow any authenticated user to view job details
        // Optionally, you can add additional checks here if needed
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        res.status(500).json({ error: "Failed to fetch job details", message: error.message });
    }
};

// UPDATE job by ID
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user?._id || req.user?.id;
        const { title, company, location, description, salary, jobType, experience, category } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid job ID format." });
        }

        if (!title || !company || !salary) {
            return res.status(400).json({ error: "Title, company, and salary are required." });
        }

        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({ error: "Salary must be a positive number." });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        if (user_id && job.user_id.toString() !== user_id.toString() && !req.user?.isAdmin) {
            return res.status(403).json({ error: "Unauthorized to update this job." });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            {
                title,
                company,
                location,
                description,
                salary: Number(salary),
                jobType: jobType || "Full-time",
                experience: experience || "Mid-level",
                category: category || "General",
                user_id,
            },
            { new: true }
        );

        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ error: "Failed to update job", message: error.message });
    }
};

// DELETE job by ID
const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user?._id || req.user?.id;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "Invalid job ID format." });
        }

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        if (user_id && job.user_id.toString() !== user_id.toString() && !req.user?.isAdmin) {
            return res.status(403).json({ error: "Unauthorized to delete this job." });
        }

        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Failed to delete job", message: error.message });
    }
};

module.exports = { postJob, getAllJobs, getJobById, updateJob, deleteJob };