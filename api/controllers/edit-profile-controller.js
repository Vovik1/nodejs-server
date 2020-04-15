const mongoose = require('mongoose');
const User = mongoose.model('User');

const updateProfile = async (req, res) => {
    try{
        const updatedUser = User.updateOne({email: req.body.oldData.email}, {$set: {

        }})
    }
    catch (err) {
        
    }
}