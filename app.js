const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const cors = require(`cors`);
require('./api/models/db');
require('./api/config/passport');

const apiRouter = require('./api/routes/index');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Access-Token, access-token');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});


app.use(cors());
app.use('/api', apiRouter);

module.exports = app;