const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const Book = require('../models/book');

router.get('/', (req, res) => {
    Book.find()
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});

router.get('/:id', (req, res) => {
    var id = req.params.id;

    Book.findById(id)
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});


router.post('/', (req, res) => {
    var book = new Book({
       bookName: req.body.bookName,
       author: req.body.author,
       genre: req.body.genre,
       releaseDate: req.body.releaseDate,
       bookImage: req.body.bookImage,
       active: req.body.active
    }); 

    book.save()
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});

router.put('/:id', (req, res) => { 
     var id = req.params.id;
 
     var book = {
        bookName: req.body.bookName,
        author: req.body.author,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        bookImage: req.body.bookImage,
        active: req.body.active
     }; 
 
     Book.findByIdAndUpdate(id, { $set: book }, { new: true })
      .then((val) => {
        res.send(val);
      })
      .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
      });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
       return res.status(404).send(`No record of ${id}`);
    }

    Book.findByIdAndRemove(id)
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
});

module.exports = router;