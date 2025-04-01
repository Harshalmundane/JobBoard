import React from "react";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = () => {
   

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-20 bg-blue-500 text-white">
                <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
                <p className="mt-2 text-lg">Explore opportunities that match your skills and passion.</p>
                <Link to="/jobs" className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md font-bold">Browse Jobs</Link>
            </div>

            {/* About Section */}
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold text-center mb-4">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h3 className="font-bold text-xl">Verified Employers</h3>
                        <p className="mt-2 text-gray-600">We connect you with trusted companies offering real opportunities.</p>
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h3 className="font-bold text-xl">Wide Job Selection</h3>
                        <p className="mt-2 text-gray-600">Browse jobs from various industries and locations.</p>
                    </div>
                    <div className="bg-white p-6 shadow-md rounded-lg text-center">
                        <h3 className="font-bold text-xl">Easy Application</h3>
                        <p className="mt-2 text-gray-600">Apply quickly with a single click and track your applications.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;