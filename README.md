# Job Portal Project
MERN Job Portal

A full-stack Job Portal application built with the MERN stack that connects Job Seekers with Employers (Job Posters). The platform provides role-based authentication, job posting, job applications, and application management features with real-time status updates.

🚀 Features
👨‍💼 For Employers (Job Posters)

Secure sign-up and login as Job Poster.

Post new job listings with details like title, description, location, and salary.

View applications submitted by Job Seekers for their posted jobs.

Approve or reject applications with real-time status updates.

👩‍💻 For Job Seekers

Sign up and login as a Job Seeker.

Browse and search jobs posted by Employers.

Apply for jobs and track application status (Approved / Rejected / Pending).

Manage and view history of all applied jobs.

🔎 Common Features

Role-based authentication (JWT-based).

Search and filter functionality for jobs.

Responsive UI for both Job Seekers and Employers.

RESTful API backend with MongoDB as the database.

🛠️ Tech Stack

Frontend: React.js, Redux (or Context API), Tailwind CSS / Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT (JSON Web Tokens), bcrypt.js for password hashing

Other: REST API, Axios

📂 Project Structure
MERN-Job-Portal/
│
├── backend/           # Express server & API routes
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   └── server.js      # Main server entry point
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # UI pages (Login, Dashboard, etc.)
│   │   ├── redux/      # Redux store (if used)
│   │   └── App.js
│
└── README.md          # Project documentation

⚙️ Installation & Setup

Clone the repo

git clone https://github.com/your-username/MERN-Job-Portal.git
cd MERN-Job-Portal


Backend setup

cd backend
npm install
npm start


Frontend setup

cd frontend
npm install
npm start


Environment Variables
Create a .env file inside the backend/ folder:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
