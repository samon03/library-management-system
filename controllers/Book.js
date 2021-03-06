const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment');

const Book = require('../models/book');
const Borrow = require('../models/borrow');

exports.getAllBooks = (req, res) => {
    Book.find()
     .then((book) => {
         res.render('library', {
            book: book,
            auth: req.session.isLoggedIn,
            role: req.session.role,
            path: '/'
         });
     }).catch(err => {
        console.log(`Cannot get all books ${JSON.stringify(err, undefined, 2)}`);
     });
};

exports.getSigleBook = (req, res) => {
    var id = req.params.id;

    Book.findById(id)
     .then((book) => {
         res.render('details', {
            book: book,
            auth: req.session.isLoggedIn,
            role: req.session.role,
            path: '/' + id
         });
         // res.send(book);
     }).catch(err => {
        console.log("Book Invalid");
     });
};

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
     .then((product) => {
       res.send(val);
     }).catch(err => {
       console.log("Cannot update the book");
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
               res.write("<h3> Request Successfully Send for all books <h3>");
               res.end('<a href='+'/'+'>Go to Home</a>');
            }).catch(err => {
               console.log("Request Invalid");
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

         res.write("<h3> Request Successfully Send <h3>");
         res.end('<a href='+'/'+'>Go to Home</a>');

      }).catch(err => {
         res.write("<h3>Invalid Request!<h3>");
         res.end('/login');
      });
}

// get

exports.getUpdateBook = (req, res) => { 
   const editMode = req.query.edit;
   if (!editMode) {
     return res.redirect('/');
   }

   const bookId = req.params.id;
   Book.findById(bookId)
     .then(book => {
       if (!book) {
         return res.redirect('/');
       }
       res.render('edit', {
         path: '/edit/' + bookId,
         editing: editMode,
         book: book,
         auth: req.session.isLoggedIn,
         role: req.session.role,
         moment: moment
       });
     })
     .catch(err => console.log(err));
}

exports.postUpdateBook = (req, res) => { 
   const bookId = req.body.bookId;
   const updatedBookName = req.body.bookName;
   const updatedAuthor = req.body.author;
   const updatedGenre = req.body.genre;
   const updatedReleaseDate = req.body.releaseDate;
   const updatedBookImage = req.body.bookImage;
   const updatedActive = req.body.active;

   Book.findById(bookId)
   .then(book => {
      book.bookName = updatedBookName;
      book.author = updatedAuthor;
      book.genre = updatedGenre;
      book.releaseDate = updatedReleaseDate;
      book.bookImage = updatedBookImage;
      book.active = updatedActive;
     return book.save().then(result => {
       console.log('Updated Book!');
       res.redirect('/');
       
     });
   })
   .catch(err => console.log("Update invalid"));
}

 exports.deleteBook = (req, res, next) => {
   const bookId = req.body.bookId;
   Book.deleteOne({ _id: bookId })
     .then(() => {
       console.log('DESTROYED');
       res.redirect('/');
     })
     .catch(err => console.log(err));
 };
 
 exports.getAddBook = (req, res, next) => {
   res.render('add', {
      path: '/',
      auth: req.session.isLoggedIn,
      role: req.session.role,
      editing: false
   });
 };

 exports.postAddBook = (req, res, next) => {
   librarianId = req.session.user._id;
      
      if(librarianId)
      {
         const updatedBookName = req.body.bookName;
         const updatedAuthor = req.body.author;
         const updatedGenre = req.body.genre;
         const updatedReleaseDate = req.body.releaseDate;
         const updatedBookImage = req.body.bookImage;
         const updatedActive = req.body.active;
    
         var book = new Book({
            bookName: updatedBookName,
            author: updatedAuthor,
            genre: updatedGenre,
            releaseDate: updatedReleaseDate,
            bookImage: updatedBookImage,
            active: updatedActive,
            librarianId: librarianId
         });

         book.save()
            .then(result => {
               console.log('Added Book');
               res.redirect('/');
            })
            .catch(err => {
               console.log('Invalid');
            });
   } else {
      res.write('<h4>You are not allowed</h4>');
   }
 };