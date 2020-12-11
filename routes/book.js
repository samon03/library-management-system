const path = require('path');

const express = require('express');

const bookController = require('app/controllers/book');

const isLibrarian = require('../middleware/is-librarian');
const isStudent = require('../middleware/is-student');

const router = express.Router();

router.get('/', bookController.getAllBooks);

router.post('/borrow', isStudent, bookController.borrowAllBooks);

router.post('/borrow/:id', isStudent, bookController.borrowABook);

router.get('/add', isLibrarian, bookController.getAddBook);

router.post('/add', isLibrarian, bookController.postAddBook);

router.post('/delete', isLibrarian, bookController.deleteBook);
 
router.get('/edit/:id', isLibrarian, bookController.getUpdateBook);

router.post('/:id', isLibrarian, bookController.postUpdateBook);

router.get('/:id', bookController.getSigleBook);

module.exports = router;
