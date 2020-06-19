const mongoose = require('mongoose');

const Categorie = mongoose.model('Categorie');

async function getAllCategories(req, res) {
  try {
    const docs = await Categorie.find();
    const categories = docs.map((doc) => {
      return {
        id: doc._id,
        title: doc.title,
      };
    });
    res.status(200).json(categories);
  } catch (err) {
    res.json(err);
  }
}

module.exports = { getAllCategories };
