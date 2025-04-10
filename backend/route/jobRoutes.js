const express = require('express');
const router = express.Router();
const { postJob } = require('../controllers/jobController');
const auth = require('../middleware/auth'); // adjust path

router.post('/jobs', auth, postJob);

module.exports = router;
