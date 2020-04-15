const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

mongoose.model('Categorie', categorySchema);