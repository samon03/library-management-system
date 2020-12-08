const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;

const Book = require('../models/book');

exports.getAllBooks = (req, res) => {
    Book.find()
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
};

exports.getSigleBook = (req, res) => {
    var id = req.params.id;

    Book.findById(id)
     .then((val) => {
        res.send(val);
     })
     .catch(err => {
        console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
     });
};

exports.insertBook =  (req, res) => {
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
}

exports.updateBook = (req, res) => { 
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
}

exports.deleteBook =  (req, res) => {
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
}
