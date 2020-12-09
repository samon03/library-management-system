const path = require('path');

const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.get('/', bookController.getAllBooks);

router.get('/:id', bookController.getSigleBook);

router.post('/', bookController.insertBook);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;
