const mongoose = require('mongoose');
const User = mongoose.model('User');

const updateProfile = (req, res) => {
    try{
        User.updateOne({email: req.body.oldData.email})
    }
    catch (err) {
        
    }
}