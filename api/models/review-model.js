const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  imgUrl: String,
  userName: String,
  review: String,
});

mongoose.model('Review', reviewSchema);
