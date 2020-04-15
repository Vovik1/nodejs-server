const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surName: String,
    role: {
        type: String,
        required: true
    },
    hash:String,
    salt: String,
    imageUrl:String
});

userSchema.methods.setPassword = function (password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,1000,64,'sha512')
    .toString('hex');
};

userSchema.methods.generateJwt = function(){
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    let isAdmin = false;

    const user = User.findOne({email: this.email});
    if(user.role == `admin`){
        isAdmin = true;
    }
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        isAdmin: isAdmin,
        exp:parseInt(expiry.getTime()/1000,10)
    }, process.env.JWT_KEY);

};

userSchema.methods.validatePassword = function(password){
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
}

userSchema.methods.isAdmin = async function(email){
    try{
        const user = await User.findOne({email: email});
        if(user.role != 'admin'){
            return false;
        }else{
            return true;
        }
    }catch (err) {
        return false;
    }
};

const User = mongoose.model('User', userSchema);
