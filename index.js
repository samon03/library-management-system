const path = require('path');

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);

const bookRoutes = require('./routes/book');
const authRoutes = require('./routes/auth');

const MONGODB_URI =
   'mongodb+srv://shy:wA1ce9DPE2Q6t62J@cluster1.n1dim.mongodb.net/book'


const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  }));

  mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3002);
    console.log('===== Connected =====');
  })
  .catch(() => {
    console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
  });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(authRoutes);
app.use('/library', bookRoutes);