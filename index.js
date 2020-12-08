const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/book');

mongoose
  .connect('mongodb+srv://shy:wA1ce9DPE2Q6t62J@cluster1.n1dim.mongodb.net/book')
  .then(result => {
    app.listen(3001)
    console.log('========= Connected! =========');
  })
  .catch(err => {
    console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/library', bookRoutes);