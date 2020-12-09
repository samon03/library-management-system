const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var borrow = mongoose.model('Borrow', {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }
});

module.exports = borrow;