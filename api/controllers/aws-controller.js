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

const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) 
        + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits:{ fileSize: 2000000 },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('avatarImage');

function checkFileType( file, cb ){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if( mimetype && extname ){
    return cb( null, true );
  }else {
    cb( 'Error: Images Only!' );
  }
}

const uploadAvatar = (req,res) => {
  profileImgUpload(req,res, async error => {
    if(error) {
      return res.status(422).json( { error: error } );
    }
    if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( 'Error: No File Selected' );
      } else {
        // If Success
        const imageLocation = req.file.location;
        const userId = req.userData._id;
        const updatedUser = await User.findByIdAndUpdate(userId, {$set: { imageUrl: imageLocation }});
        return res.status(200).json(updatedUser);  
      }
  })
}

module.exports = {uploadAvatar};