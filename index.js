const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/book');
const librarianRoutes = require('./routes/librarian');
const authRoutes = require('./routes/auth');

const MONGODB_URI =
   'mongodb+srv://shy:wA1ce9DPE2Q6t62J@cluster1.n1dim.mongodb.net/book'

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

  mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3002);
    console.log('========= Connected! =========');
  })
  .catch(() => {
    console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
  });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(authRoutes);
app.use('/library', bookRoutes);
app.use(librarianRoutes);