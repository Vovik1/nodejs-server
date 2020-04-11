const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
require('./api/models/db');
require('./api/config/passport');

const awsRouter = require('./api/routes/aws-router');
const lectureRouter = require('./api/routes/lecture-router');
const authRouter = require('./api/routes/auth-router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api/aws', awsRouter);
app.use('/api/auth', authRouter);
app.use('/api/lecture', lectureRouter);


module.exports = app;