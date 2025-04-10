const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["Job Seeker", "Job Poster"], required: true },
    logo: { type: String }  // NEW FIELD for storing uploaded logo filename
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
