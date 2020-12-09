const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var borrow = mongoose.model('Borrow', {
    user: [
        {
            type: Object,
            ref: 'User'
        }
    ],
    book: [
        {
            type: Object,
            ref: 'Book'
        }
    ]
});

module.exports = borrow;