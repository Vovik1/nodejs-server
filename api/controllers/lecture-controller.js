const Lecture = require('../models/lecture-model');

async function getAll(req, res) {
    try {
        const docs = await Lecture.find({'title': 'Learning React'})
        const posts = docs.map(doc => {
            return {
                title: doc.title, 
                message: doc.message
            }
        })
        res.status(200).json(posts);
    } catch(err) {
        res.json(err);
    }
};

async function create(req, res) {
    try {
        const newLecture = new Lecture({
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            messages:req.body.messages
        })
        const lecture = await newLecture.save()
        res.status(201).json(lecture);    
    } catch(err) {
        res.status(500).json(err);
    }
};

module.exports = {getAll,create};
