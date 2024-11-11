const mongoose = require('mongoose');

// Schema
const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true // Corrected from 'require' to 'required'
    },
    lastname: {
        type: String,
        required: true // Corrected from 'require' to 'required'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true // Removed 'unique: true' for password
    }
}, { timestamps: true }); // Optional: Add timestamps for createdAt and updatedAt

// Models
const Adm = mongoose.model('Adm', adminSchema); // Renamed model to 'User' for clarity
module.exports = Adm;
