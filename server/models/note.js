// CREATE USER-NOTES SCHEMA

// DEPENDENCY FUNCTIONS:
const mongoose = require('mongoose');

// DEFINE SCHEMA
const NoteSchema = new mongoose.Schema({
    userID: String,
    note: String
});

module.exports = mongoose.model('Note', NoteSchema);