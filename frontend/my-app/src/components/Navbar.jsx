import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 

const Navbar = () => { 
    const [user, setUser] = useState(null); 

    useEffect(() => { 
        const storedUser = JSON.parse(localStorage.getItem("user")); 
        if (storedUser) { 
            setUser(storedUser); 
        } 
    }, []); 

    const handleLogout = () => { 
        localStorage.removeItem("user"); 
        setUser(null); 
        window.location.reload(); 
    }; 

    return ( 
        <nav className="bg-blue-600 p-4 shadow-md"> 
            <div className="container mx-auto flex justify-between items-center"> 
                <Link to="/" className="text-white text-2xl font-bold">Job Board</Link> 
                <ul className="flex space-x-4 text-white"> 
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    
                    {/* Conditionally render "Jobs" link based on user role */}
                    {user?.role !== "Job Poster" && (
                        <li><Link to="/jobs" className="hover:underline">Jobs</Link></li>
                    )}

                    {/* Show "Post Job" & "Job Application" only for Job Posters */}
                    {user?.role === "Job Poster" && (
                        <>
                            <li><Link to="/postjob" className="hover:underline">Post Job</Link></li>
                            <li><Link to="/application" className="hover:underline">Job Applications</Link></li>
                        </>
                    )}

                    {!user ? (
                        <>
                            <li><Link to="/register" className="hover:underline">Register</Link></li>
                            <li><Link to="/login" className="hover:underline">Login</Link></li>
                        </>
                    ) : (
                        <li>
                            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg">Logout</button>
                        </li>
                    )}
                </ul> 
            </div> 
        </nav> 
    ); 
}; 

export default Navbar;
