const User = require('../models/user-model');

async function signUp(req, res) {
    if (!req.body.email || !req.body.password) return res.status(422).json({message: 'email and password are required'});
    try {
        const userExist = await User.findOne({email: req.body.email})
        if (userExist) return res.status(422).json({message: 'User with this email is already exist'});
        const user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.setPassword(req.body.password); 
        const response = await user.save()
        res.status(201).json({message: 'user created', response});
    } catch(err) {
        errorCatch(err, res)
    }  
};

function errorCatch(error, res) {
    console.log(error);
    res.status(500).json(error);
}

module.exports = {signUp};

