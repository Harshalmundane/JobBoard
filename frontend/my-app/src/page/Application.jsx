/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import { Search, Calendar, MapPin, DollarSign, Mail, Phone, User, Clock, Home } from "lucide-react"

const Application = () => {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch all job applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/jobs/getAllApplications")
        setApplications(response.data)
        setFilteredApplications(response.data)
      } catch (error) {
        setError(error.message)
        console.error("Error fetching job applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  // Filter applications based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredApplications(applications)
    } else {
      const filtered = applications.filter(
        (app) =>
          app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredApplications(filtered)
    }
  }, [searchTerm, applications])

  // Format date to a readable string
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return "Invalid date"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Applications Dashboard</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Track and manage all your job applications in one place
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Stats Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, position, or location..."
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
              <User size={14} className="mr-1" />
              Total: {applications.length}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              <Clock size={14} className="mr-1" />
              Active: {applications.length}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-t-blue-500">
                <div className="p-4 pb-2">
                  <div className="h-6 w-3/4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Error Loading Applications</h3>
            <p>{error}</p>
            <button
              className="mt-4 px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Applications List */}
        {!loading && !error && (
          <>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 inline-flex rounded-full p-4 mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No applications found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
                {searchTerm && (
                  <button
                    className="mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((application) => (
                  <div
                    key={application._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-blue-500"
                  >
                    <div className="p-6 pb-3 flex flex-row justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{application.fullName}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {application.position}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {application.fullName?.charAt(0) || "A"}
                      </div>
                    </div>
                    <div className="p-6 pt-3">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Mail size={16} className="mr-2 text-gray-400" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone size={16} className="mr-2 text-gray-400" />
                          <span>{application.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2 text-gray-400" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign size={16} className="mr-2 text-gray-400" />
                          <span>Expected: {application.expectedSalary}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <span>Available: {formatDate(application.startDate)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <span>DOB: {formatDate(application.dob)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Home size={16} className="mr-2 text-gray-400" />
                          <span className="truncate" title={application.address}>
                            {application.address?.length > 30
                              ? `${application.address.substring(0, 30)}...`
                              : application.address}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button className="flex-1 px-3 py-1.5 text-sm border border-blue-200 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          View Details
                        </button>
                        <button className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Application

