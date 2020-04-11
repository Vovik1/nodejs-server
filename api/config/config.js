const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    mongoDbUser: process.env.MONGO_DB_USER,
    mongoDbPassword: process.env.MONGO_DB_PASSWORD,
    mongoHost: process.env.MONGO_DB_HOST,
    jwtKey: process.env.JWT_KEY,
    awsKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsAccess: process.env.AWS_SECRET_ACCESS_KEY,
    awsBucket: process.env.AWS_BUCKET
};