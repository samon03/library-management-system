const Book = require('../models/book');

exports.getAllBooks = (req, res) => {
   Book.find()
    .then((val) => {
       res.send(val);
    }).catch(err => {
       console.log(`Cannot get all books ${JSON.stringify(err, undefined, 2)}`);
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
      }).catch(err => {
         console.log("Cannot insert the book");
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
