const path = require('path');

const express = require('express');

const librarianController = require('../controllers/librarian');

const router = express.Router();

router.get('/admin', librarianController.getAllBooks);

router.post('/admin', librarianController.insertBook);

router.put('/admin/:id', librarianController.updateBook);

router.delete('/admin/:id', librarianController.deleteBook);

module.exports = router;
