'use strict';

// mongoose start
// grab the things we need
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose-shivstar', {
    useMongoClient: true
});

// create/defining a schema 
var UserSchema = new mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "email": { type: String, required: true,
               lowercase: true, unique: true },
    "password": { type: String, required: true },
    "rating":  Number,
    "language": String
});

// the schema is useless so far
// we need to create a model using it(model: saved and retrieved data from database)
module.exports = mongoose.model('User', UserSchema);

// make this available to our users in our Node applications
// module.exports = UserModel;
// --------------------------------------------------------------------------------------------
// mongoose end