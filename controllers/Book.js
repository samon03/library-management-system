const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;

const Book = require('../models/book');
const Borrow = require('../models/borrow');

exports.getAllBooks = (req, res) => {
    Book.find()
     .then((book) => {
         res.render('library', {
            book: book,
            path: '/library'
         });
     }).catch(err => {
        console.log(`Cannot get all books ${JSON.stringify(err, undefined, 2)}`);
     });
};

exports.getSigleBook = (req, res) => {
    var id = req.params.id;

    Book.findById(id)
     .then((val) => {
        res.send(val);
     }).catch(err => {
        console.log(`Cannot get the book ${JSON.stringify(err, undefined, 2)}`);
     });
};

exports.insertBook =  (req, res) => {

   librarianId = req.session.user._id;
   
   if(librarianId)
   {
      // console.log(librarianId);
      var book = new Book({
         bookName: req.body.bookName,
         author: req.body.author,
         genre: req.body.genre,
         releaseDate: req.body.releaseDate,
         bookImage: req.body.bookImage,
         active: req.body.active,
         librarianId: librarianId
      }); 
   
      book.save()
        .then((val) => {
           res.send(val);
        }).catch(err => {
           console.log("Cannot insert the book");
        });
   }
 
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
     }).catch(err => {
       console.log("Cannot update the book");
     });
  }

exports.deleteBook =  (req, res) => {
   var id = req.params.id;

   Book.findByIdAndRemove(id)
    .then((val) => {
       res.send(val);
    }).catch(err => {
       console.log("Cannot delete the book");
    });
  }

  // Request for book

  exports.borrowAllBooks = (req, res) => {
   var user = req.session.user;

   Book.find()
      .then(book => {
         var borrow = new Borrow({
             user: user,
             book: book
         });

         borrow.save()
            .then((val) => {
               res.send(val);
            }).catch(err => {
               console.log("Cannot insert all books");
            });

      }).catch(err => {
       res.write("<h3>Invalid Request!<h3>");
      });
}

exports.borrowABook = (req, res) => {
   var id = req.params.id;
   var user = req.session.user;

   Book.findById(id)
      .then(book => {

         var borrow = new Borrow({
             user: user,
             book: book
         });

         borrow.save()
            .then((val) => {
               res.send(val);
            }).catch(err => {
               console.log("Cannot insert the book");
            });

      }).catch(err => {
       res.write("<h3>Invalid Request!<h3>");
      });
}