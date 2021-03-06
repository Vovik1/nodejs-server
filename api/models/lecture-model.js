const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  messageText: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
  },
});

const lectureSchema = new mongoose.Schema({
  imgUrl: String,
  author: String,
  title: { type: String, required: true },
  defaultRating: String,
  videoUrl: { type: String, required: true },
  description: { type: String, required: true },
  messages: [messageSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  categoryId: { type: mongoose.Schema.Types.ObjectId },
  categoryTitle: String,
});

mongoose.model('Lecture', lectureSchema);
