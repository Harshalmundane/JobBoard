
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Ensure Navbar path is correct; adjust if your file structure differs
import Navbar from "../components/Navbar"; // Verify this path matches your project

const ApplyJob = () => {
    const { id: jobId } = useParams();
    const [job, setJob] = useState(null);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        position: "",
        expectedSalary: "",
        startDate: "",
        location: "",
        companyName: "",
        jobTitle: "",
        experience: "",
        responsibilities: "",
        reasonForLeaving: "",
        resume: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Load user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (storedUser && storedUser._id) {
            setUser(storedUser);
            setFormData((prev) => ({
                ...prev,
                fullName: storedUser.username || "",
                email: storedUser.email || "",
            }));
        }

        // Fetch job details
        console.log("Fetching job details for jobId:", jobId);
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("Please log in to apply for jobs.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get(`http://localhost:3001/api/jobs/${jobId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const jobData = response.data;
                setJob(jobData);
                setFormData((prev) => ({
                    ...prev,
                    companyName: jobData.company || "",
                    jobTitle: jobData.title || "",
                    position: jobData.title || "",
                    location: jobData.location || "",
                }));
            } catch (error) {
                console.error("Error fetching job details:", error);
                toast.error(error.response?.data?.error || "Failed to load job details.");
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                } else if (error.response?.status === 404) {
                    navigate("/jobs");
                }
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchJobDetails();
        } else {
            toast.error("Job ID not found.");
            navigate("/jobs");
        }
    }, [jobId, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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
            "resume",
        ];
        const missingFields = requiredFields.filter((field) => !formData[field]);
        if (missingFields.length > 0) {
            toast.error(`Please fill all required fields: ${missingFields.join(", ")}`);
            setIsSubmitting(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("User not logged in");
                setIsSubmitting(false);
                return;
            }

            const applicationData = new FormData();
            applicationData.append("jobId", jobId);
            applicationData.append("fullName", formData.fullName);
            applicationData.append("email", formData.email);
            applicationData.append("phone", formData.phone);
            applicationData.append("dob", formData.dob);
            applicationData.append("gender", formData.gender);
            applicationData.append("address", formData.address);
            applicationData.append("position", formData.position);
            applicationData.append("expectedSalary", formData.expectedSalary);
            applicationData.append("startDate", formData.startDate);
            applicationData.append("location", formData.location);
            applicationData.append("companyName", formData.companyName);
            applicationData.append("jobTitle", formData.jobTitle);
            applicationData.append("experience", formData.experience);
            applicationData.append("responsibilities", formData.responsibilities);
            applicationData.append("reasonForLeaving", formData.reasonForLeaving);
            if (formData.resume) {
                applicationData.append("resume", formData.resume);
            }

            const response = await axios.post("http://localhost:3001/api/job-applications/apply", applicationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(response.data.message || "Application submitted successfully!");
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                dob: "",
                gender: "",
                address: "",
                position: "",
                expectedSalary: "",
                startDate: "",
                location: "",
                companyName: "",
                jobTitle: "",
                experience: "",
                responsibilities: "",
                reasonForLeaving: "",
                resume: null,
            });
            setTimeout(() => navigate("/my-applications"), 1000);
        } catch (error) {
            console.error("Error submitting application:", error);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || "Failed to submit application.";
            toast.error(errorMessage);
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <Navbar />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                <div className="container mx-auto px-6 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Job Not Found</h2>
                    <p className="text-gray-600 mt-2">The job you're looking for does not exist.</p>
                    <button
                        onClick={() => navigate("/jobs")}
                        className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white text-center">
                        <h1 className="text-3xl font-bold">Apply for {job.title}</h1>
                        <p className="mt-2 opacity-90">Submit your application for {job.company}</p>
                    </div>
                    <div className="p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Company</p>
                                <p className="text-base font-medium text-gray-900">{job.company || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-base font-medium text-gray-900">{job.location || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Salary</p>
                                <p className="text-base font-medium text-gray-900">₹{job.salary || "Not specified"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="text-base font-medium text-gray-900">{job.category || "General"}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-base text-gray-900">{job.description || "No description available"}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Your address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Position <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Position applied for"
                                    value={formData.position}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Expected Salary <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="expectedSalary"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="e.g. 80000"
                                    value={formData.expectedSalary}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Preferred work location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Resume <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="resume"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    onChange={handleChange}
                                    accept=".pdf"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Experience</label>
                            <textarea
                                name="experience"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                                placeholder="Describe your relevant experience"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                            <textarea
                                name="responsibilities"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                                placeholder="Key responsibilities from previous roles"
                                value={formData.responsibilities}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Reason for Leaving</label>
                            <textarea
                                name="reasonForLeaving"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                                placeholder="Reason for leaving your previous job"
                                value={formData.reasonForLeaving}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="pt-4 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate("/jobs")}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${
                                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Submitting Application...
                                    </span>
                                ) : (
                                    "Submit Application"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;