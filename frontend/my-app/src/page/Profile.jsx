"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
    socialProfiles: {
      linkedin: "",
      github: "",
      portfolio: "",
      twitter: "",
    },
    resume: null,
    profilePicture: null,
  })

  const [newSkill, setNewSkill] = useState("")
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  })
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    current: false,
  })

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("token") // Get token separately from localStorage
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData)
        if (parsedUser && parsedUser._id) {
          // Check for _id instead of id
          setUser({ ...parsedUser, token }) // Add token to user object
        } else {
          toast.error("Invalid user session. Please log in again.")
          // Redirect to login or handle authentication
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
        toast.error("Invalid user session. Please log in again.")
      }
    } else {
      toast.error("Please log in to access your profile.")
      // Redirect to login page
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    if (!user || !user._id || !user.token) {
      // Use _id instead of id
      console.error("User not authenticated")
      return
    }

    try {
      console.log("[v0] Fetching profile for user:", user._id) // Use _id instead of id
      const response = await fetch(`http://localhost:3001/api/profiles/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Profile API response:", result)

        const profileData = result.data
        console.log("[v0] Profile data extracted:", profileData)

        const mappedProfile = {
          firstName: profileData.name ? profileData.name.split(" ")[0] || "" : "",
          lastName: profileData.name ? profileData.name.split(" ").slice(1).join(" ") || "" : "",
          email: user.email || "", // Use email from user object
          phone: profileData.phone || "",
          location: profileData.location || "",
          bio: profileData.bio || "",
          skills: Array.isArray(profileData.skills) ? profileData.skills : [],
          experience: Array.isArray(profileData.workExperience)
            ? profileData.workExperience.map((exp) => ({
                company: exp.company || "",
                position: exp.position || "",
                startDate: exp.startDate || "",
                endDate: exp.endDate || "",
                description: exp.description || "",
                current: exp.current || false,
                id: exp._id || Date.now(),
              }))
            : [],
          education: Array.isArray(profileData.education) ? profileData.education : [],
          socialProfiles: {
            linkedin: profileData.linkedin || "",
            github: profileData.github || "",
            portfolio: profileData.website || "", // Map website to portfolio
            twitter: profileData.twitter || "",
          },
          resume: profileData.resume || null,
          profilePicture: profileData.profilePicture || null,
        }

        console.log("[v0] Mapped profile data:", mappedProfile)
        setProfile(mappedProfile)
      } else {
        console.log("[v0] Profile not found, will create new one on save")
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to load profile data")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user || !user._id || !user.token) {
      toast.error("Please log in to update your profile.")
      return
    }

    try {
      console.log("[v0] Submitting profile update for user:", user._id)
      const response = await fetch(`http://localhost:3001/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user._id, // Use _id instead of id
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          location: profile.location,
          primaryRole: "Developer",
          yearsOfExperience: "1-2 years",
          bio: profile.bio,
          linkedin: profile.socialProfiles.linkedin,
          github: profile.socialProfiles.github,
          website: profile.socialProfiles.portfolio,
          twitter: profile.socialProfiles.twitter,
          skills: profile.skills,
          workExperience: profile.experience.map((exp) => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            current: exp.current,
            description: exp.description,
          })),
        }),
      })

      const data = await response.json()
      console.log("[v0] Profile update response:", data)

      if (response.ok && data.success) {
        toast.success("Profile updated successfully!")
      } else {
        toast.error(data.message || "Failed to update profile")
        console.error("Backend error:", data)
      }
    } catch (error) {
      toast.error("Error updating profile")
      console.error("Error:", error)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setProfile({
        ...profile,
        experience: [...profile.experience, { ...newExperience, id: Date.now() }],
      })
      setNewExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      })
    }
  }

  const removeExperience = (id) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setProfile({
        ...profile,
        education: [...profile.education, { ...newEducation, id: Date.now() }],
      })
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        current: false,
      })
    }
  }

  const removeEducation = (id) => {
    setProfile({
      ...profile,
      education: profile.education.filter((edu) => edu.id !== id),
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access your profile.</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Skills</h2>
              <p className="text-gray-600 mb-4">This will help startups hone in on your strengths.</p>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(profile.skills) &&
                  profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
              </div>
            </div>

            {/* Social Profiles */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Profiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={profile.socialProfiles.linkedin}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialProfiles: { ...profile.socialProfiles, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={profile.socialProfiles.github}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialProfiles: { ...profile.socialProfiles, github: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                  <input
                    type="url"
                    value={profile.socialProfiles.portfolio}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialProfiles: { ...profile.socialProfiles, portfolio: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                  <input
                    type="url"
                    value={profile.socialProfiles.twitter}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialProfiles: { ...profile.socialProfiles, twitter: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
