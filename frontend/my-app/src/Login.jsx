import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
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
            const response = await axios.post("http://localhost:3001/api/auth/login", user);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data
            alert("Login successful!");
            navigate("/"); // Redirect to home page
            window.location.reload(); // Reload to update navbar
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-600 p-2 rounded-md text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 font-semibold hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
