'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose-shivstar',{
    useMongoClient: true
});

// create a schema
var stateSchema = new mongoose.Schema({
    "state": { type: String, required: true, unique: true }
});

module.exports = mongoose.model('states', stateSchema);