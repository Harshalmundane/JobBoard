const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    salary: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to the user model
        required: true
    }
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
