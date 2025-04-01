/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const JobApplication = () => {
    const { jobId } = useParams(); // Get job ID from URL params
    const navigate = useNavigate(); // For redirecting after form submission

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        position: "",
        expectedSalary: "",
        startDate: "",
        location: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting application:", { ...formData, jobId });
    
        try {
            const response = await axios.post("http://localhost:3001/api/jobs/applyJob", {
                ...formData,
                jobId: jobId || "defaultJobId",
            });
            console.log("Response:", response.data);
            alert("Job application submitted successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error submitting application:", error.response?.data || error.message);
            alert("Failed to submit job application.");
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Job Application</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="text" name="position" placeholder="Position Applied For" value={formData.position} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="text" name="expectedSalary" placeholder="Expected Salary" value={formData.expectedSalary} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <input type="text" name="location" placeholder="Preferred Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mt-2" />
                    <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 transition">Apply</button>
                </form>
            </div>
        </div>
    );
};

export default JobApplication;
