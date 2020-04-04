const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@projectdb-16pvg.mongodb.net/test?retryWrites=true&w=majority`;

const lectureRouter = require('./api/routes/lecture-router');

mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/test",{
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>{
  console.log("Mongoose is connected!!!");
});

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/lecture', lectureRouter);

module.exports = app;