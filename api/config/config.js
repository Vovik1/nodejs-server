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
    awsBucket: process.env.AWS_BUCKET,
    
    facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
    facebook_client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    facebook_callback_url: process.env.FACEBOOK_CALLBACK_URL,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL
};