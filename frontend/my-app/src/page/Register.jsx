/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Briefcase, ArrowRight } from "lucide-react";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "Job Seeker",
        logo: null
    });

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setUser({ ...user, logo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
    
        try {
            const formData = new FormData();
            formData.append("username", user.name);
            formData.append("email", user.email);
            formData.append("phone", user.phone);
            formData.append("password", user.password);
            formData.append("role", user.role);

            // Debug: Log FormData contents
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
    
            if (user.role === "Job Poster" && user.logo) {
                formData.append("logo", user.logo);
            }
    
            const response = await axios.post(
                "http://localhost:3001/api/auth/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            if (response.status === 201) {
                toast.success("Registration successful! Please log in.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Registration error:", err);
            const errorMessage = err.response?.data?.message || 
                              err.response?.data?.error?.message || 
                              "Registration failed. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-lg">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center text-white">
                    <h1 className="text-3xl font-bold mb-2">Create My Account</h1>
                    <p className="opacity-90">Join our platform to find or post amazing job opportunities</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={user.name}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={user.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    minLength="6"
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+1 (555) 123-4567"
                                    value={user.phone}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Role Field */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">I want to</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Briefcase className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    name="role"
                                    value={user.role}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                                    required
                                >
                                    <option value="Job Seeker">Find a Job</option>
                                    <option value="Job Poster">Post Jobs</option>
                                </select>
                            </div>
                        </div>

                        {/* Logo Upload (Only for Job Posters) */}
                        {user.role === "Job Poster" && (
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Upload Company Logo</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                                    />
                                </div>
                                {user.logo && (
                                    <p className="text-sm text-gray-500 mt-1">Selected: {user.logo.name}</p>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Register Now
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;