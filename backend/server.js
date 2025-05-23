
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./route/authRoutes");
const jobRoutes=require('./route/jobApplication');
const jobPost=require('./route/jobRoutes')
const connectDB = require("./database/db");
const Userdb = require("./model/model");

dotenv.config();
const app = express();
const port = 3001;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      express.json()(req, res, next);
    } else {
      next();
    }
  });

// Enable CORS
app.use(cors());

app.use('/uploads', express.static('uploads'));

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobsPost",jobPost)

// Home route
app.get("/", (req, res) => {
    res.send("<h1>Home page of a Job portal </h1>");
});

// Create a new job
app.post("/api/jobs", async (req, res) => {
    const { title, company, location, description, salary } = req.body;
    try {
        const newJob = new Userdb({ title, company, location, description, salary });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Userdb.find();
        res.json(jobs);
    } catch (error) {
        console.error("Error getting jobs:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is started at port no ${port}`);
});
