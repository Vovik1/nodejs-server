const mongoose = require('mongoose');
const User = mongoose.model('User');

const updateName = async (req, res) => {
    try{
      const user = await User.findOne({email: req.body.oldData.email})
       if(!user){
           res.json({message: "user does not exist"});
       }
       user.name = req.body.newData.first_name;
       user.surName = req.body.newData.surName;
        const response = await user.save()
        res.status(200).json({message: 'user updated', response});
    }
    catch (err) {
        res.status(500).json(err);
    }
}

const updateEmail = async (req, res) => {
    try{
        const userExist = await User.findOne({email: req.body.newData.email})
        if(userExist){
            res.json({message: 'Email is already used'});
        }
        const user = await User.findOne({email: req.body.oldData.email});
        if(!user){
            res.json({message: 'User was not found'});
        }
        user.email = req.body.newData.email;
        const response = await user.save();
        res.status(200).json({message: 'user updated', response});
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {updateName, updateEmail};