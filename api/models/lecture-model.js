const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: String,
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    messageText: String,
    createdOn: {
      type: Date,
      'default': Date.now
    }
  });


const lectureSchema = new mongoose.Schema({
    imgUrl: String,
    author: String,
    title: {type: String, required: true},
    defaultRating:String,
    oldPrice: String,
    newPrice: String,
    videoUrl: String,
    description: {type:String, required: true},
    messages: [messageSchema],
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId}
})

mongoose.model('Lecture', lectureSchema);
