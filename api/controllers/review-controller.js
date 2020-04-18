const mongoose = require('mongoose');
const Review = mongoose.model('Review');

async function getReviews(req, res) {
    try {
        const docs = await Review.find()
        const reviews = docs.map(doc => {
            return {
                id: doc._id,
                imgUrl: doc.imgUrl,
                userName: doc.userName, 
                review: doc.review
            }
        })
        res.status(200).json(reviews);
    } catch(err) {
        res.json(err);
    }
};

module.exports = {getReviews}