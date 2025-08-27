
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("token");
        console.log("Stored User:", storedUser);
        console.log("Stored Token:", token);

        if (!storedUser || !storedUser._id || !token) {
            console.error("No valid user or token found");
            toast.error("Please log in to view your applications.");
            navigate("/login");
            return;
        }

        setUser(storedUser);
        fetchApplications(storedUser._id);
    }, [navigate]);

    const fetchApplications = async (userId) => {
        try {
            console.log("Fetching applications for userId:", userId);
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                toast.error("Please log in to view your applications.");
                navigate("/login");
                return;
            }

            const response = await axios.get(`http://localhost:3001/api/job-applications?userId=${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Applications response:", response.data);
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            if (error.response?.status === 401 || error.response?.status === 403) {
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            } else {
                toast.error(error.response?.data?.error || "Failed to load applications.");
            }
        } finally {
            setLoading(false);
        }
    };

    const openModal = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "Hired":
                return "bg-green-100 text-green-700 border border-green-300";
            case "Rejected":
                return "bg-red-100 text-red-700 border border-red-300";
            case "Interview":
                return "bg-blue-100 text-blue-700 border border-blue-300";
            case "Reviewed":
                return "bg-yellow-100 text-yellow-700 border border-yellow-300";
            case "Pending":
            default:
                return "bg-gray-100 text-gray-700 border border-gray-300";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <div className="bg-indigo-700 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">My Applications</h1>
                    <p className="text-xl md:text-2xl mb-8">View and manage your job applications</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="mb-12">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : applications.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
                            <p className="text-gray-600 mt-1">You haven't applied for any jobs yet.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {applications.map((application) => (
                                <div key={application._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="w-full">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className="text-indigo-600 font-semibold text-base">{application.companyName || "Unknown Company"}</p>
                                                </div>
                                                <h2 className="text-lg font-bold text-gray-900 mb-1">{application.jobTitle || "Unknown Job"}</h2>
                                                <p className="text-gray-500 text-sm line-clamp-3 mb-3">{application.position || "N/A"}</p>
                                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {application.location || "N/A"}
                                                </div>
                                                <p className="text-gray-700 font-medium mb-3">
                                                    <span className="text-indigo-600">Expected Salary:</span> ₹{application.expectedSalary || "N/A"}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusStyles(application.status)}`}>
                                                        {application.status || "Pending"}
                                                    </span>
                                                    <button
                                                        onClick={() => openModal(application)}
                                                        className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && selectedApplication && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-1">Application Details</h2>
                                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(selectedApplication.status)}`}>
                                        {selectedApplication.status || "Pending"}
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Full Name</p>
                                            <p className="text-base text-gray-900">{selectedApplication.fullName || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Email</p>
                                            <p className="text-base text-gray-900">{selectedApplication.email || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Phone</p>
                                            <p className="text-base text-gray-900">{selectedApplication.phone || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Date of Birth</p>
                                            <p className="text-base text-gray-900">{formatDate(selectedApplication.dob)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Gender</p>
                                            <p className="text-base text-gray-900">{selectedApplication.gender || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Address</p>
                                            <p className="text-base text-gray-900">{selectedApplication.address || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Position</p>
                                            <p className="text-base text-gray-900">{selectedApplication.position || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Expected Salary</p>
                                            <p className="text-base text-gray-900">₹{selectedApplication.expectedSalary || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Start Date</p>
                                            <p className="text-base text-gray-900">{formatDate(selectedApplication.startDate)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Location</p>
                                            <p className="text-base text-gray-900">{selectedApplication.location || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Company Name</p>
                                            <p className="text-base text-gray-900">{selectedApplication.companyName || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Job Title</p>
                                            <p className="text-base text-gray-900">{selectedApplication.jobTitle || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-lg md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Experience</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase">Experience</p>
                                            <p className="text-base text-gray-900">{selectedApplication.experience || "N/A"}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-xs font-medium text-gray-500 uppercase">Reason for Leaving</p>
                                            <p className="text-base text-gray-900">{selectedApplication.reasonForLeaving || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs font-medium text-gray-500 uppercase">Responsibilities</p>
                                        <p className="text-base text-gray-900">{selectedApplication.responsibilities || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-lg md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents</h3>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase">Resume</p>
                                        {selectedApplication.resume ? (
                                            <a
                                                href={`http://localhost:3001/uploads/${selectedApplication.resume}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                View Resume
                                            </a>
                                        ) : (
                                            <div className="flex items-center text-gray-500">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                No resume uploaded
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-6 flex justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Close
                            </button>
                            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Take Action
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-indigo-50 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore More Opportunities</h2>
                    <p className="text-gray-600 mb-6">Browse available jobs to find your next career move</p>
                    <Link
                        to="/jobs"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Browse Jobs
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyApplications;