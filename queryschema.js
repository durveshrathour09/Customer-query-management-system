const mongoose = require('mongoose');

// Schema
const querySchema = new mongoose.Schema({
    department: {
        type: String,
        required: true // Corrected 'require' to 'required'
    },
    subject: {
        type: String,
        required: true // Corrected 'require' to 'required'
    },
    query: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true // Optional: if uid is necessary
    }
}, { timestamps: true }); // Optional: Add timestamps for createdAt and updatedAt

// Model
const Query = mongoose.model('Query', querySchema); // Renamed model to 'Query' for clarity

// Export the model
module.exports = Query;
