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
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('lectureVideo');

function checkFileType( file, cb ){
  const filetypes = /mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if( mimetype && extname ){
    return cb( null, true );
  }else {
    cb( 'Error: Images Only!' );
  }
}

const uploadVideo = (req,res) => {
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
        console.log(imageLocation, userId)
    //     const updatedUser = await User.findByIdAndUpdate(userId, {$set: { imageUrl: imageLocation }});
    //     return res.status(200).json({updatedUser: {
    //         _id: updatedUser._id,
    //         name: updatedUser.name,
    //         surName: updatedUser.surName,
    //         email: updatedUser.email,
    //         role: updatedUser.role,
    //         imageUrl: imageLocation
    //     }
    //   });
      }
  })
}

module.exports = {uploadVideo};