import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/jobs");
            setJobs(response.data);
            setFilteredJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = jobs.filter((job) =>
            job.title.toLowerCase().includes(value)
        );
        setFilteredJobs(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Job Listings Section */}
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Available Jobs</h1>
                
                {/* Search Bar */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by job role..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {loading ? (
                    <p className="text-center text-gray-600">Loading jobs...</p>
                ) : filteredJobs.length === 0 ? (
                    <p className="text-center text-gray-600">No jobs available</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.map((job) => (
                            <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <h2 className="text-2xl font-semibold text-blue-700">{job.title}</h2>
                                <p className="text-gray-600 mt-2">Company: <span className="font-medium">{job.company}</span></p>
                                <p className="text-gray-600">Location: <span className="font-medium">{job.location}</span></p>
                                <p className="text-gray-700 mt-4">{job.description}</p>
                                <p className="text-gray-700 font-bold mt-4">Salary: {job.salary}</p>
                                <Link to={`/apply/${job._id}`}>
    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Apply Now
    </button>
</Link>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
