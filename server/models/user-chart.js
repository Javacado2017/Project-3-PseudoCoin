// CREATE USER-CHART SCHEMA

// DEPENDENCY FUNCTIONS:
const mongoose = require('mongoose');

// DEFINE SCHEMA
const ChartSchema = new mongoose.Schema({
    userID: String,
    chart: String
});

module.exports = mongoose.model('Chart', ChartSchema);