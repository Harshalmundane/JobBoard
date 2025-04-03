/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react"
import axios from "axios";
import Navbar from "../components/Navbar"
import { Search, Calendar, MapPin, DollarSign, Mail, Phone, User, Clock, Home, Briefcase, ChevronRight } from "lucide-react"

const Application = () => {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

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

  useEffect(() => {
    let filtered = applications
    
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (app) =>
          app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter(app => app.status === selectedStatus)
    }

    setFilteredApplications(filtered)
  }, [searchTerm, selectedStatus, applications])

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return "N/A"
    }
  }

  const statusColors = {
    "Pending": "bg-yellow-100 text-yellow-800",
    "Reviewed": "bg-blue-100 text-blue-800",
    "Interview": "bg-purple-100 text-purple-800",
    "Rejected": "bg-red-100 text-red-800",
    "Hired": "bg-green-100 text-green-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Applications Dashboard</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Manage and track all candidate applications
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-10">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search candidates..."
                className="pl-10 w-full border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <select
                className="border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Hired">Hired</option>
              </select>
              
              <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Briefcase size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                <User size={14} className="mr-1" />
                Total: {applications.length}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                <Clock size={14} className="mr-1" />
                New: {applications.filter(a => a.status === "Pending").length}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Showing {filteredApplications.length} of {applications.length} candidates
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-3 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 w-full bg-gray-200 rounded"></div>
                    <div className="h-8 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Error loading applications</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications List */}
        {!loading && !error && (
          <>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchTerm || selectedStatus !== "All" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No applications have been submitted yet"}
                </p>
                {(searchTerm || selectedStatus !== "All") && (
                  <button
                    className="mt-4 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedStatus("All")
                    }}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((application) => (
                  <div
                    key={application._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-gray-900">{application.fullName}</h3>
                            {application.status && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status] || "bg-gray-100 text-gray-800"}`}>
                                {application.status}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{application.position}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {application.fullName?.charAt(0) || "A"}
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-start">
                          <Mail size={16} className="flex-shrink-0 mt-1 mr-2 text-gray-400" />
                          <a href={`mailto:${application.email}`} className="text-sm text-gray-600 hover:text-indigo-600 break-all">
                            {application.email}
                          </a>
                        </div>
                        <div className="flex items-start">
                          <Phone size={16} className="flex-shrink-0 mt-1 mr-2 text-gray-400" />
                          <a href={`tel:${application.phone}`} className="text-sm text-gray-600 hover:text-indigo-600">
                            {application.phone || "N/A"}
                          </a>
                        </div>
                        <div className="flex items-start">
                          <MapPin size={16} className="flex-shrink-0 mt-1 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-600">{application.location || "N/A"}</span>
                        </div>
                        <div className="flex items-start">
                          <DollarSign size={16} className="flex-shrink-0 mt-1 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {application.expectedSalary || "Salary not specified"}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Calendar size={16} className="flex-shrink-0 mt-1 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Applied: {formatDate(application.createdAt) || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
                          View details
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                        <div className="flex gap-2">
                          <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                            <Phone size={16} />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                            <Mail size={16} />
                          </button>
                        </div>
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