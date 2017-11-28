'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose-shivstar', {
    useMongoClient: true
});

var contactSchema = new mongoose.Schema({
    "id": Number,
    "userName": { type: String, required: true },
    "lastName": String,
    "email": { type: String, required: true },
    "password": String,
    "address": String,
    "mobNo": Number,
    "language": String,
    "title": String
});

module.exports = mongoose.model('contacts',contactSchema);