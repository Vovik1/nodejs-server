const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.headers['access-token']) {
    jwt.verify(
      req.headers['access-token'],
      process.env.JWT_KEY,
      (err, decoded) => {
        if (err) return res.sendStatus(401);
        req.userData = decoded;
        return next();
      }
    );
  } else res.sendStatus(401);
};
