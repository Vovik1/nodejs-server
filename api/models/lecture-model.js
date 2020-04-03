const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: {type: String, required: true},
    videoUrl: String,
    description: String,
    messages:String
})

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;