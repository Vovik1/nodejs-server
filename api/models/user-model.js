const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  favouriteLectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  surName: String,
  hash: String,
  salt: String,
  imageUrl: String,
});

function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
}

function generateToken() {
  const expiry = new Date();
  expiry.setDate(expiry.getHours() + 1);


  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      surName: this.surName,
      role: this.role,
      exp: parseInt(expiry.getTime() / 1000, 10),
    },
    process.env.JWT_KEY
  );
}

function validatePassword(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
}

userSchema.methods.setPassword = setPassword;

userSchema.methods.generateJwt = generateToken;

userSchema.methods.validatePassword = validatePassword;

mongoose.model('User', userSchema);
