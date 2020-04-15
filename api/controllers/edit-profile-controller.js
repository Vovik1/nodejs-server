const mongoose = require('mongoose');
const User = mongoose.model('User');

const updateProfile = async (req, res) => {
    try{
      const user = await User.findOne({email: req.body.oldData.email})
       if(!user){
           res.json('Updating failed');
       }
       user.name = req.body.newData.first_name;
        user.surName = req.body.newData.surName;
        user.email = req.body.newData.email;
        user.setPassword(req.body.newData.password);
        const response = await user.save()
        res.status(200).json({message: 'user updated', response});

    }
    catch (err) {
        res.json(err);
    }
}

module.exports = {updateProfile};