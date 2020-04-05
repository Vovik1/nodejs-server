const mongoose = require('mongoose');
const dbURL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@projectdb-16pvg.mongodb.net/test?retryWrites=true&w=majority`;


const connect = () => {
    setTimeout(() => mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }), 1000);
  }
  
mongoose.connection.on('connected', () => {
    console.log('DB is connected');
  });
  
mongoose.connection.on('error', err => {
    console.log('error: ' + err);
    return connect();
  });
  
mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
  });


connect();

require('./lecture-model');
require('./user-model');
