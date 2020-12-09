const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    librarianId: {
        type: Schema.Types.ObjectId,
        ref: 'Librarian',
        required: true
    }

})

module.exports = Book;