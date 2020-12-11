const path = require('path');

const dotenv = require('dotenv');
const fs = require('fs');
const compression = require('compression');
const morgan = require('morgan');

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
const moment = require("moment");

dotenv.config();

var app = express();


const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  }));

app.use((req, res, next)=>{
  res.locals.moment = moment;
  next();
});

  mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 3002);
    console.log('===== Connected =====');
  })
  .catch(() => {
    console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
  });



app.use(authRoutes);
app.use('/library', bookRoutes);