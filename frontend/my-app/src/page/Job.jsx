import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/jobs");
            setJobs(response.data);
            setFilteredJobs(response.data);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(response.data.map(job => job.category || "General"))];
            setCategories(["All", ...uniqueCategories]);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        filterJobs(value, selectedCategory);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        filterJobs(searchTerm, category);
    };

    const filterJobs = (searchValue, category) => {
        const filtered = jobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchValue);
            const matchesCategory = category === "All" || job.category === category || (!job.category && category === "General");
            return matchesSearch && matchesCategory;
        });
        setFilteredJobs(filtered);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-indigo-700 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Next Opportunity</h1>
                    <p className="text-xl md:text-2xl mb-8">Browse through our curated list of exciting career opportunities</p>
                    
                    {/* Search Bar */}
                  {/* Search Bar - Updated Version */}
<div className="max-w-3xl mx-auto">
    <div className="relative">
        <input
            type="text"
            placeholder="Search by job title, company, or keywords..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 pr-12 rounded-lg shadow-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200"
        />
        <svg 
            className="absolute right-4 top-4 h-6 w-6 text-indigo-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
        </svg>
    </div>
</div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Job Listings */}
                <div className="mb-12">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                            <p className="mt-1 text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <div key={job._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-2">
                                                    {job.category || "General"}
                                                </span>
                                                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                                                <p className="mt-1 text-indigo-600 font-medium">{job.company}</p>
                                            </div>
                                            {job.logo && (
                                                <img className="h-12 w-12 object-contain" src={job.logo} alt={`${job.company} logo`} />
                                            )}
                                        </div>
                                        
                                        <div className="mt-4 flex items-center text-gray-500">
                                            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{job.location}</span>
                                        </div>
                                        
                                        <p className="mt-4 text-gray-600 line-clamp-3">{job.description}</p>
                                        
                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">{job.salary}</span>
                                            <Link 
                                                to={`/apply-job/${job._id}`}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                                            >
                                                Apply Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-indigo-50 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Can't find what you're looking for?</h2>
                    <p className="text-gray-600 mb-6">Sign up for job alerts and we'll notify you when matching positions become available</p>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                        Get Job Alerts
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Jobs;