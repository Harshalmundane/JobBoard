// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Jobs from "./page/Job";
import Register from "./page/Register";
import Login from "./page/Login";
import PostJob from "./page/PostJob";
import Applications from "./page/Application";
import JobApplication from "./page/jobApplication";

const ProtectedRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();

    if (!user) {
        return <Navigate to="/register" replace state={{ from: location }} />;
    }

    return element;
};

const App = () => {
    return (
        <Router>
            
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
                <Route path="/postjob" element={<ProtectedRoute element={<PostJob />} />} />
                <Route path="/application" element={<ProtectedRoute element={<Applications />} />} />
                <Route path="/apply-job/:id" element={<ProtectedRoute element={<JobApplication />} />} />
                <Route path="*" element={<Navigate to="/register" />} />
            </Routes>
        </Router>
    );
};

export default App;
