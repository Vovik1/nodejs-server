const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Video or images only!');
}

function selectMulterConfig(fieldname) {
  const multerConfig = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET,
      acl: 'public-read',
      key(req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).single(fieldname); // 'avatarImage','lectureVideo'

  return multerConfig;
}

const uploadAvatar = (req, res) => {
  selectMulterConfig('avatarImage')(req, res, async (error) => {
    if (error) {
      return res.status(422).json({ error });
    }
    if (req.file === undefined) {
      res.json('Error: No File Selected');
    }
    // If Success
    const imageLocation = req.file.location;
    const userId = req.userData._id;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: { imageUrl: imageLocation },
    });
    return res.status(200).json({
      updatedUser: {
        _id: updatedUser._id,
        name: updatedUser.name,
        surName: updatedUser.surName,
        email: updatedUser.email,
        role: updatedUser.role,
        imageUrl: imageLocation,
      },
    });
  });
};

const uploadVideo = (req, res) => {
  selectMulterConfig('lectureVideo')(req, res, async (error) => {
    if (error) {
      return res.status(422).json({ error: 'Suppose to be images and videos' });
    }
    if (req.file === undefined) {
      return res.json('Error: No File Selected');
    }
    // If Success
    const videoLocation = req.file.location;
    return res.status(200).json({
      videoUrl: videoLocation,
    });
  });
};

module.exports = { uploadAvatar, uploadVideo, s3 };
