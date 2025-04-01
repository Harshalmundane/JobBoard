
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered. Please use a different email." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, email, password: hashedPassword, phone, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

exports.logout = (req, res) => {
    res.json({ message: "User logged out successfully" });
};