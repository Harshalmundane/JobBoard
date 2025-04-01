import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "Job Seeker",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post("http://localhost:3001/api/auth/register", {
                username: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                role: user.role,
            });

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Register
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded-md text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Select Role</label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="Job Seeker">Job Seeker</option>
                            <option value="Job Poster">Job Poster</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 font-semibold hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
