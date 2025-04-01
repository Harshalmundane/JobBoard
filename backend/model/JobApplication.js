const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String },
    address: { type: String, required: true },
    position: { type: String, required: true },
    expectedSalary: { type: String, required: true },
    startDate: { type: Date, required: true },
    location: { type: String, required: true },
    companyName: { type: String },
    jobTitle: { type: String },
    experience: { type: String },
    responsibilities: { type: String },
    reasonForLeaving: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
