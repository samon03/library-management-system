const path = require('path');

const express = require('express');

const bookController = require('../controllers/book');

const isLibrarian = require('../middleware/is-librarian');
const isStudent = require('../middleware/is-student');

const router = express.Router();

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSigleBook);

router.post('/', isLibrarian, bookController.insertBook);

router.put('/:id', isLibrarian, bookController.updateBook);

router.delete('/:id', isLibrarian, bookController.deleteBook);

router.post('/borrow', isStudent, bookController.borrowAllBooks);

router.post('/borrow/:id', isStudent, bookController.borrowABook);

module.exports = router;
