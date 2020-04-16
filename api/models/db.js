const mongoose = require('mongoose');
const dbURL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}`;


const connect = () => {
    setTimeout(() => mongoose.connect(dbURL, {
      useNewUrlParser: true, 
      useCreateIndex: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false}
      ), 1000);
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
require('./category-model');
