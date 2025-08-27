const mongoose = require("mongoose");
const JobApplication = require("../model/JobApplication");
const Job = require("../model/job");

const applyJob = async (req, res) => {
    try {
        const user_id = req.user?._id || req.user?.id;
        const {
            fullName,
            email,
            phone,
            dob,
            gender,
            address,
            position,
            expectedSalary,
            startDate,
            location,
            companyName,
            jobTitle,
            experience,
            responsibilities,
            reasonForLeaving,
            jobId,
        } = req.body;

        // Validate required fields
        const requiredFields = [
            "fullName",
            "email",
            "phone",
            "dob",
            "address",
            "position",
            "expectedSalary",
            "startDate",
            "location",
            "jobId",
        ];
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Validate jobId
        if (!mongoose.isValidObjectId(jobId)) {
            return res.status(400).json({ error: "Invalid job ID format." });
        }

        // Validate user_id
        if (!user_id || !mongoose.isValidObjectId(user_id)) {
            return res.status(401).json({ error: "Invalid or missing user ID." });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        // Check for resume file
        const resume = req.file ? req.file.filename : null;
        if (!resume) {
            return res.status(400).json({ error: "Resume file is required." });
        }

        // Check for existing application
        const existingApplication = await JobApplication.findOne({ jobId, user_id });
        if (existingApplication) {
            return res.status(409).json({ error: "You have already applied for this job." });
        }

        // Validate date fields
        if (dob && isNaN(Date.parse(dob))) {
            return res.status(400).json({ error: "Invalid date of birth format." });
        }
        if (startDate && isNaN(Date.parse(startDate))) {
            return res.status(400).json({ error: "Invalid start date format." });
        }

        const newApplication = new JobApplication({
            user_id,
            jobId,
            fullName,
            email,
            phone,
            dob: dob ? new Date(dob) : undefined,
            gender,
            address,
            position,
            expectedSalary,
            startDate: startDate ? new Date(startDate) : undefined,
            location,
            companyName: companyName || job.company,
            jobTitle: jobTitle || job.title,
            experience,
            responsibilities,
            reasonForLeaving,
            resume,
            status: "Pending",
        });

        const savedApplication = await newApplication.save();
        res.status(201).json({ message: "Application submitted successfully", application: savedApplication });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit application", message: error.message });
    }
};

// Other endpoints (unchanged)
const getAllApplications = async (req, res) => {
    try {
        const { userId } = req.query;
        const authUserId = req.user?._id || req.user?.id;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required in query." });
        }

        if (userId !== authUserId && !req.user?.isAdmin) {
            return res.status(403).json({ error: "Unauthorized to access other users' applications." });
        }

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ error: "Invalid user ID format." });
        }

        const applications = await JobApplication.find({ user_id: userId }).lean();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications", message: error.message });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id).populate("user_id", "username email");
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        const user_id = req.user?._id || req.user?.id;
        if (user_id && application.user_id.toString() !== user_id && !req.user?.isAdmin) {
            return res.status(403).json({ error: "Unauthorized access to this application" });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch application", message: error.message });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        const user_id = req.user?._id || req.user?.id;
        if (user_id && application.user_id.toString() !== user_id && !req.user?.isAdmin) {
            return res.status(403).json({ error: "Unauthorized to delete this application" });
        }

        await JobApplication.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete application", message: error.message });
    }
};

const getApplicationsForMyJobs = async (req, res) => {
    try {
        const employerId = req.user?._id || req.user?.id;

        if (!employerId) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        if (!mongoose.isValidObjectId(employerId)) {
            return res.status(400).json({ error: "Invalid employer ID" });
        }

        if (req.user?.role !== "Job Poster") {
            return res.status(403).json({ error: "Only job posters can view applications" });
        }

        const myJobs = await Job.find({ user_id: employerId }).select("_id");
        const jobIds = myJobs.map((job) => job._id);

        if (jobIds.length === 0) {
            return res.status(200).json([]);
        }

        const applications = await JobApplication.find({ jobId: { $in: jobIds } })
            .populate("jobId", "title company location")
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications", message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        const employerId = req.user?._id || req.user?.id;

        if (!mongoose.isValidObjectId(applicationId)) {
            return res.status(400).json({ error: "Invalid application ID" });
        }

        if (!["Pending", "Reviewed", "Interview", "Rejected", "Hired"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const application = await JobApplication.findById(applicationId);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        const job = await Job.findById(application.jobId);
        if (!job || job.user_id.toString() !== employerId.toString()) {
            return res.status(403).json({ error: "Unauthorized to update this application" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ message: "Application status updated", application });
    } catch (error) {
        res.status(500).json({ error: "Failed to update application status", message: error.message });
    }
};

module.exports = {
    applyJob,
    getAllApplications,
    getApplicationById,
    deleteApplication,
    getApplicationsForMyJobs,
    updateApplicationStatus,
};