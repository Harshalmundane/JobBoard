const Job = require('../model/model'); // or adjust the path as needed

// POST /jobs
const postJob = async (req, res) => {
    try {
        const { title, company, location, description, salary } = req.body;
        const user_id = req.user.id; // make sure req.user is set from auth middleware
        

        const newJob = new Job({
            title,
            company,
            location,
            description,
            salary,
            user_id
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post job', message: error.message });
    }
};



module.exports = { postJob };
