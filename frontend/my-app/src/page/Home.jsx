import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar/>

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-20 pt-32 sm:pt-48 lg:pt-56 px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                            <span className="block">Find Your</span>
                            <span className="block text-indigo-600">Dream Job</span>
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-600">
                            Discover opportunities that align with your skills and passion. 
                            Join thousands who found their perfect career match.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link 
                                to="/jobs" 
                                className="px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Browse Jobs
                            </Link>
                            <Link 
                                to="/register" 
                                className="px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                            >
                                Post a Job
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
            </div>

            {/* Stats Section */}
           {/* Stats Section - Revised */}
<div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center p-8 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-all">
                <p className="text-5xl font-bold text-indigo-700">10,000+</p>
                <p className="mt-2 text-lg font-medium text-gray-700">Jobs Available</p>
            </div>
            <div className="text-center p-8 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-all">
                <p className="text-5xl font-bold text-indigo-700">5,000+</p>
                <p className="mt-2 text-lg font-medium text-gray-700">Companies Hiring</p>
            </div>
            <div className="text-center p-8 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-all">
                <p className="text-5xl font-bold text-indigo-700">1M+</p>
                <p className="mt-2 text-lg font-medium text-gray-700">Successful Hires</p>
            </div>
        </div>
    </div>
</div>

            {/* Features Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Why Choose Our Platform?
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            We provide the tools and resources to help you find the perfect career opportunity.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="pt-6 pb-8 px-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flow-root bg-indigo-50 rounded-lg p-4 w-16 h-16 flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-center text-gray-900">Verified Employers</h3>
                            <p className="mt-2 text-base text-gray-600 text-center">
                                We connect you with trusted companies offering real opportunities.
                            </p>
                        </div>
                        
                        <div className="pt-6 pb-8 px-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flow-root bg-indigo-50 rounded-lg p-4 w-16 h-16 flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-center text-gray-900">Smart Search</h3>
                            <p className="mt-2 text-base text-gray-600 text-center">
                                Advanced filters to find exactly what you're looking for.
                            </p>
                        </div>
                        
                        <div className="pt-6 pb-8 px-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flow-root bg-indigo-50 rounded-lg p-4 w-16 h-16 flex items-center justify-center mx-auto">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-lg font-medium text-center text-gray-900">Easy Application</h3>
                            <p className="mt-2 text-base text-gray-600 text-center">
                                Apply quickly with a single click and track your applications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-50">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-12 sm:p-16">
                            <div className="text-center">
                                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                                    <span className="block">Ready to advance your career?</span>
                                </h2>
                                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                                    Create your profile today and get discovered by top employers.
                                </p>
                                <div className="mt-8">
                                    <Link 
                                        to="/register" 
                                        className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;