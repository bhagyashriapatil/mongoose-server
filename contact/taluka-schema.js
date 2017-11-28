'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose-shivstar', {
    useMongoClient: true
});

var talukaSchema = new mongoose.Schema({
    "state": { type: String, required: true },
    "district": { type: String, required: true },
    "taluka":  { type: String, required: true },
    "created_at": Date,
    "updated_at": Date
});

module.exports = mongoose.model('talukas', talukaSchema);