const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // Reference to the Job model
      required: true,
    },
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
    reasonForLeaving: { type: String },
    resume: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Added status field for application status
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);