const mongoose = require('mongoose');
const Lecture = mongoose.model('Lecture');

async function getAll(req, res) {
    try {
        const docs = await Lecture.find()
        const lectures = docs.map(doc => {
            return {
                id: doc._id,
                imgUrl: doc.imgUrl,
                title: doc.title,
                author: doc.author,
                defaultRating: doc.defaultRating,
                oldPrice: doc.oldPrice,
                newPrice: doc.newPrice,
                videoUrl: doc.videoUrl,
                description: doc.description
            }
        })
        res.status(200).json(lectures);
    } catch (err) {
        res.json(err);
    }
};

async function getLecturesByCategory(req, res) {
    try {
        const docs = await Lecture.find({ "categoryId": req.params.categoryid })
        const lectures = docs.map(doc => {
            return {
                id: doc._id,
                imgUrl: doc.imgUrl,
                title: doc.title,
                author: doc.author,
                defaultRating: doc.defaultRating,
                oldPrice: doc.oldPrice,
                newPrice: doc.newPrice,
                videoUrl: doc.videoUrl,
                description: doc.description
            }
        })
        res.status(200).json(lectures);
    } catch (err) {
        res.json(err);
    }
};

async function getAllUsersLectures(req, res) {
    try {
        const docs = await Lecture.find({ 'userId': req.userData._id })
        const lectures = docs.map(doc => {
            return {
                id: doc._id,
                imgUrl: doc.imgUrl,
                title: doc.title,
                author: doc.author,
                defaultRating: doc.defaultRating,
                oldPrice: doc.oldPrice,
                newPrice: doc.newPrice,
                videoUrl: doc.videoUrl,
                description: doc.description
            }
        })
        res.status(200).json(lectures);
    } catch (err) {
        res.json(err);
    }
};

async function getOne(req, res) {
    try {
        const doc = await Lecture.findById(req.params.lectureid)
        if (!doc) return res.sendStatus(404);
        const post = {
            id: doc._id,
            imgUrl: doc.imgUrl,
            title: doc.title,
            author: doc.author,
            defaultRating: doc.defaultRating,
            oldPrice: doc.oldPrice,
            newPrice: doc.newPrice,
            videoUrl: doc.videoUrl,
            description: doc.description,
            messages: doc.messages
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};


async function lectureCreate(req, res) {
    try {
        const newLecture = new Lecture({
            title: req.body.title,
            author: req.author,
            imgUrl: req.body.imgUrl,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            messages: req.body.messages,
            userId: req.userData._id,
            oldPrice: req.body.oldPrice,
            newPrice: req.body.newPrice
        })
        const lecture = await newLecture.save()
        res.status(201).json(lecture);
    } catch (err) {
        res.status(400).json(err);
    }
};

function lectureUpdate(req, res) {
    if (!req.params.lectureid) {
        return res.status(404).json({ "message": "Not found, lectureid is required" })
    }
    Lecture
        .findById(req.params.lectureid) 
        .exec((err, lecture) => {
            if(!lecture){
                return res.json(404).status({"message": "lectureid not found"})
            } else if (err) {
                return res.status(400).json(err) 
            }
            Object.assign(lecture, req.body)
            lecture.save((err,lecture) => {
                if (err){
                    res.status(404).json(err)
                } else {
                    res.status(200).json(lecture);
                }  
            });
        })
    }


function lectureRemove(req, res) {
    const {lectureid} = req.params;
    if(lectureid){
        Lecture
            .findByIdAndRemove(lectureid)
            .exec((err, lecture) => {
                if (err) {
                    return res.status(404).json(err)
                }
                res.status(204).json(null)
            })
    } else {
        res.status(404).json({"message":"No Location"})
    }  
}

module.exports = {
    getAll,
    getLecturesByCategory,
    getAllUsersLectures,
    getOne,
    lectureCreate,
    lectureUpdate,
    lectureRemove
};
