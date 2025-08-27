"use client"

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./page/Home"
import Jobs from "./page/Job"
import Register from "./page/Register"
import Login from "./page/Login"
import PostJob from "./page/PostJob"
import Applications from "./page/Application"
import JobApplication from "./page/jobApplication"
import Profile from "./page/Profile"
import MyApplications from "./page/MyApplication"

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return element
}

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/jobs" element={<ProtectedRoute element={<Jobs />} />} />
        <Route path="/postjob" element={<ProtectedRoute element={<PostJob />} />} />
        <Route path="/application" element={<ProtectedRoute element={<Applications />} />} />
        <Route path="/apply-job/:id" element={<ProtectedRoute element={<JobApplication />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/my-applications" element={<ProtectedRoute element={<MyApplications />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App