const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var borrow = mongoose.model('Borrow', {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});

module.exports = borrow;