'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose-shivstar', {
    useMongoClient: true
});

var distSchema = new mongoose.Schema({
    "state": { type: String, required: true },
    "district": { type:String, required: true }
});

module.exports = mongoose.model('districts', distSchema);