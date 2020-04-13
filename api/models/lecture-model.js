const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    imgUrl: String,
    author:String,
    title: {type: String, required: true},
    author: String,
    defaultRating:String,
    oldPrice: String,
    newPrice: String,
    videoUrl: String,
    description: String,
    messages:String
})

const Lecture = mongoose.model('Lecture', lectureSchema);
