// controllers/authController.js
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;
        const logo = req.file ? req.file.filename : null;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            role: role || "Job Seeker", // Default to Job Seeker if role not provided
            logo,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Registration failed. Please try again.", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role }, // Include role
            process.env.JWT_SECRET || "your_jwt_secret", // Use env variable
            { expiresIn: "7d" }
        );

        console.log("Generated token for user:", { _id: user._id, email: user.email, role: user.role });

        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                phone: user.phone,
                logo: user.logo,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                __v: user.__v
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

exports.logout = (req, res) => {
    res.json({ message: "User logged out successfully" });
};