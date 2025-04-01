import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import PostJob from './PostJob';
import Register from './Register';
import Login from './Login';
import Jobs from './Job';
import JobApplication from './page/jobApplication';
import Application from './page/Application';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/apply/:jobId" element={<JobApplication />} />
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/application" element={<Application />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
