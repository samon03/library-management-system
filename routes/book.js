const path = require('path');

const express = require('express');

const bookController = require('../controllers/book');

const isLibrarian = require('../middleware/is-librarian');
const isStudent = require('../middleware/is-student');

const router = express.Router();

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSigleBook);

router.post('/borrow', isStudent, bookController.borrowAllBooks);

router.post('/borrow/:id', isStudent, bookController.borrowABook);

// new getAllBorrowBooks isLibrarian,
// router.get('/borrow', bookController.getAllBorrowBooks);

router.post('/delete', isLibrarian, bookController.deleteBook);
 
router.get('/edit/:id', isLibrarian, bookController.getUpdateBook);

router.post('/:id', isLibrarian, bookController.postUpdateBook);

router.get('/add', isLibrarian, bookController.getAddBook);

router.post('/add', isLibrarian, bookController.postUpdateBook);

module.exports = router;
