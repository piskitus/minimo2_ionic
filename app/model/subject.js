var mongoose = require('mongoose');

module.exports =  mongoose.model('subject', {
    name: String,
    students: String
});