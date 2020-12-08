const mongoose = require('mongoose');

var Book = mongoose.model('Book', {
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});


module.exports = Book;