import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
        jobType: "Full-time",
        experience: "Mid-level"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Check if any required field is empty
        if (!formData.title || !formData.company || !formData.location || !formData.description) {
            toast.error("Please fill all required fields");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/jobs", formData);

            if (response.status === 201) {
                toast.success("Job posted successfully!");
                // Reset form
                setFormData({
                    title: "",
                    company: "",
                    location: "",
                    description: "",
                    salary: "",
                    jobType: "Full-time",
                    experience: "Mid-level"
                });
            }
        } catch (error) {
            console.error("Error adding job:", error);
            toast.error("Failed to post job. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white text-center">
    <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Post a New Job Opportunity</h1>
        <p className="mt-2 opacity-90">Fill out the form below to list your job opening</p>
    </div>
</div>
                    {/* Job Form */}
                    <form onSubmit={handleOnSubmit} className="p-6 md:p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Job Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. Senior Frontend Developer"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Your company name"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. Remote, New York, etc."
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Salary Range
                                </label>
                                <input
                                    type="text"
                                    name="salary"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g. $80,000 - $100,000"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Job Type */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>

                            {/* Experience Level */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Experience Level
                                </label>
                                <select
                                    name="experience"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.experience}
                                    onChange={handleChange}
                                >
                                    <option value="Entry-level">Entry-level</option>
                                    <option value="Mid-level">Mid-level</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Executive">Executive</option>
                                </select>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Job Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[150px]"
                                placeholder="Describe the job responsibilities, requirements, and benefits..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Posting Job...
                                    </span>
                                ) : (
                                    "Post Job Opportunity"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;