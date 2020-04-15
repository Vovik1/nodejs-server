 const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
 const check_admin = require(`../middleware/isAdmin`)

async function signUp(req, res) {
    if (!req.body.email || !req.body.password) return res.status(422).json({message: 'email and password are required'});
    try {
        const userExist = await User.findOne({email: req.body.email})
        if (userExist) return res.status(422).json({message: 'User with this email is already exist'});
        const user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.role = 'student';
        user.setPassword(req.body.password); 
        const response = await user.save()
        res.status(201).json({message: 'user created', response});
    } catch(err) {
        errorCatch(err, res)
    }  
};

const signIn = (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(422).json({message: 'email and password are required'});
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) return res.status(404).json(err);
        if (user) {
            check_admin(user.email)
                .then(req => {
                    user.isAdmin = req;
                    token = user.generateJwt();
                    res.setHeader('Authorization', token);
                    res.status(200).json({
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    });
                })
                .catch(err => {
                    user.isAdmin = false;
                    token = user.generateJwt();
                    res.setHeader('Authorization', token);
                    res.json({
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
                    });
                })
        } else {
            res.status(401)
            .json(info);
        }
        })(req, res);
}

function errorCatch(error, res) {
    console.log(error);
    res.status(500).json(error);
}

module.exports = {signUp, signIn};


    

