const mongoose = require('mongoose');
const Lecture = mongoose.model('Lecture');

async function getAll(req, res) {
    try {
        const docs = await Lecture.find({})
        const posts = docs.map(doc => {
            return {
                imgUrl: doc.imgUrl,
                title: doc.title,
                author: doc.author,
                defaultRating: doc.defaultRating,
                oldPrice: doc.oldPrice,
                newPrice: doc.newPrice, 
                videoUrl: doc.videoUrl,
                description: doc.description,
                message: doc.messages
                
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

async function update(req, res) {
    try{
        const response = await Lecture.updateOne({'_id': req.body.id}, {$set:{
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            messages: req.body.messages
        }});
        res.status(200).json(response);
    }
    catch(err){
        res.json(err);
    }
}

async function remove(req, res){
    try{
        const response = await Lecture.remove({
            _id: req.body.id,
            title: req.body.title,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            messages: req.body.messages
        });
        res.status(200).json(response);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {getAll,create,update,remove};
