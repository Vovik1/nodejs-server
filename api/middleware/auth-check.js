var jwt = require('jsonwebtoken');
const {jwtKey} = require('../config/config');

module.exports = (req, res, next) => {
    if (req.headers['access-token']) {
        jwt.verify(req.headers['access-token'], jwtKey, (err, decoded) => {
            if (err) return res.sendStatus(401);
            req.userData = decoded
            next();
        });
    } else res.sendStatus(401)
}
