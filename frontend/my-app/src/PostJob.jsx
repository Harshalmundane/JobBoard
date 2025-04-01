import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!title || !company || !location || !description || !salary) {
            toast.error("Please fill all fields to post a job.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/api/jobs", {
                title,
                company,
                location,
                description,
                salary,
            });

            if (response.status === 201) {
                toast.success("Job added successfully!");
                setTitle("");
                setCompany("");
                setLocation("");
                setDescription("");
                setSalary("");
            }
        } catch (error) {
            console.error("Error adding job:", error);
            toast.error("Failed to add job. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Form Section */}
            <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Post a New Job
                </h2>
                <form onSubmit={handleOnSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Job Title</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter job title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Company Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter company name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Location</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter job description"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Salary</label>
                        <input
                            type="number"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Submit Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
