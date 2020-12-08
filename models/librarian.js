const mongoose = require('mongoose');

var librarian = mongoose.model('Librarian', {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    }
});

module.exports = librarian;