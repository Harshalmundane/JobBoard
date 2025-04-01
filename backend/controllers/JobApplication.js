const JobApplication = require("../model/JobApplication");

// Submit Job Application
exports.applyJob = async (req, res) => {
    try {
        console.log("Received job application data:", req.body); // Debugging log

        const { fullName, email, phone, dob, address, position, expectedSalary, startDate, location, jobId } = req.body;

        // Validate required fields
        if (!fullName || !email || !phone || !dob || !address || !position || !expectedSalary || !startDate || !location || !jobId) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Create a new job application
        const newApplication = new JobApplication({
            fullName,
            email,
            phone,
            dob,
            address,
            position,
            expectedSalary,
            startDate,
            location,
            jobId,
        });

        await newApplication.save(); // Save application in the database

        res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("Error saving application:", error);
        res.status(500).json({ error: "Failed to submit job application. Please try again later." });
    }
};
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find();
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get Single Application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json(application);
    } catch (error) {
        console.error("Error fetching application:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete Application
exports.deleteApplication = async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ error: "Server error" });
    }
};
