const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

// Route imports
const authRoutes = require("./route/authRoutes");
const jobRoutes = require("./route/jobRoutes");              // For posting + getting jobs
const jobApplicationRoutes = require("./route/jobApplication"); // For applying to jobs
const profileRoutes = require("./route/profileRoutes");

dotenv.config();
const app = express();
const port = 3001;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Simpler JSON parsing

// Serve static files for uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);               // ✅ Jobs (post/get)
app.use("/api/job-applications", jobApplicationRoutes); // ✅ Job applications
app.use("/api/profiles", profileRoutes);       // Just one consistent profile route

// Home route
app.get("/", (req, res) => {
    res.send("<h1>Home page of a Job portal</h1>");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
});
