const {mongoDbUser, mongoDbPassword, mongoHost} = require('../config/config')
const mongoose = require('mongoose');
const dbURL = `mongodb+srv://${mongoDbUser}:${mongoDbPassword}@${mongoHost}`;


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
