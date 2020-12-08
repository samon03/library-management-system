const mongoose = require('mongoose');

var student = mongoose.model('Student', {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registered: {
        type: Boolean,
        default: true
    }
});

module.exports = student;