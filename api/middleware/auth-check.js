const jwt = require('jsonwebtoken');

function generateNewJWT (user){
    const expiry = new Date();
    expiry.setDate(expiry.getHours() + 1);

    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name,
        surName: user.surName,
        role: user.role,
        exp:parseInt(expiry.getTime()/1000,10)
    }, process.env.JWT_KEY);

}

module.exports = (req, res, next) => {
    if (req.headers['access-token']) {
        jwt.verify(req.headers['access-token'], process.env.JWT_KEY, (err, decoded) => {
            if (err) return res.sendStatus(401);
            req.userData = decoded;
            res.setHeader('Access-Token',generateNewJWT(req.userData));
            next();
        });
    } else res.sendStatus(401);
};

