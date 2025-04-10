import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload(); // Optional: force UI to update
    };
    

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Brand Logo/Name */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <svg className="h-8 w-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                            <span className="ml-2 text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-200">
                                JobConnect
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`px-3 py-2 text-sm font-medium ${location.pathname === "/" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-700 hover:text-indigo-500"} transition-colors duration-200`}
                        >
                            Home
                        </Link>

                        {user?.role !== "Job Poster" && (
                            <Link
                                to="/jobs"
                                className={`px-3 py-2 text-sm font-medium ${location.pathname === "/jobs" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-700 hover:text-indigo-500"} transition-colors duration-200`}
                            >
                                Browse Jobs
                            </Link>
                        )}

                        {user?.role === "Job Poster" && (
                            <>
                                <Link
                                    to="/postjob"
                                    className={`px-3 py-2 text-sm font-medium ${location.pathname === "/postjob" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-700 hover:text-indigo-500"} transition-colors duration-200`}
                                >
                                    Post Job
                                </Link>
                                <Link
                                    to="/application"
                                    className={`px-3 py-2 text-sm font-medium ${location.pathname === "/application" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-700 hover:text-indigo-500"} transition-colors duration-200`}
                                >
                                    Applications
                                </Link>
                            </>
                        )}

                        {!user ? (
                            <div className="flex items-center space-x-4 ml-4">
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
                                >
                                    Login
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 ml-4">
                                {user && (
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                                            Hi, {user.username || user.email.split("@")[0]}
                                        </span>

                                        {user.role === "Job Poster" && user.logo && (
                                            <img
                                                src={`http://localhost:3001/uploads/${user.logo}`}
                                                alt="User Logo"
                                                className="h-14 w-14 rounded-full object-contain bg-white p-1 border border-gray-300"
                                            />
                                        )}
                                    </div>
                                )}




                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                                >
                                    Logout
                                </button>
                            </div>


                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"} transition-colors duration-200`}
                        >
                            Home
                        </Link>

                        {user?.role !== "Job Poster" && (
                            <Link
                                to="/jobs"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/jobs" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"} transition-colors duration-200`}
                            >
                                Browse Jobs
                            </Link>
                        )}

                        {user?.role === "Job Poster" && (
                            <>
                                <Link
                                    to="/postjob"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/postjob" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"} transition-colors duration-200`}
                                >
                                    Post Job
                                </Link>
                                <Link
                                    to="/application"
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/application" ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"} transition-colors duration-200`}
                                >
                                    Applications
                                </Link>
                            </>
                        )}

                        {!user ? (
                            <div className="pt-4 pb-2 border-t border-gray-200">
                                <Link
                                    to="/register"
                                    className="block w-full px-4 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors duration-200"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="block w-full mt-2 px-4 py-2 text-left text-base font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    Login
                                </Link>
                            </div>
                        ) : (
                            <div className="pt-4 pb-2 border-t border-gray-200">
                                <div className="px-4 py-2 text-base font-medium text-gray-700">
                                    Welcome, {user.name}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full mt-2 px-4 py-2 text-left text-base font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;