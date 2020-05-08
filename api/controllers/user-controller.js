const mongoose = require('mongoose');
const User = mongoose.model('User');

async function getAllUsers(req, res) {
    console.log(req.userData);
    // if(req.userData.role !== "admin"){
    //     res.status(401).json({message: "Only for admin"});
    // }
    try {
        const docs = await User.find();
        const users = docs.map(doc => {
            return {
                id: doc._id,
            email: doc.email,
            name: doc.name,
            surName: doc.surName,
            role: doc.role,
            imageUrl: doc.image
            }
        });
        res.status(200).json(users);
    } catch(err) {
        res.json(err);
    }
}

module.exports = {getAllUsers};