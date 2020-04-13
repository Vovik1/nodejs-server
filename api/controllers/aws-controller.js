const { v4: uuidv4 } = require('uuid');
const {awsKeyId, awsAccess, awsBucket} = require('../config/config')
const path = require( 'path' );
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


const s3 = new AWS.S3({
  accessKeyId: awsKeyId,
  secretAccessKey: awsAccess,
});


const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: awsBucket,
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 }).single('avatarImage');

 function checkFileType( file, cb ){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );
 if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }

 const uploadAvatar = (req,res) =>{ 
   profileImgUpload( req, res, ( error ) => {
  // console.log( 'requestOkokok', req.file );
  // console.log( 'error', error );
  if( error ){
   console.log( 'errors', error );
   res.json( { error: error } );
  } else {
   // If File not found
   if( req.file === undefined ){
    console.log( 'Error: No File Selected!' );
    res.json( 'Error: No File Selected' );
   } else {
    // If Success
    const imageName = req.file.key;
    const imageLocation = req.file.location;
    console.log(imageName, imageLocation)
// Save the file name into database into profile model
res.json( {
     image: imageName,
     location: imageLocation
    } );
   }
  }
 });
}


module.exports = {uploadAvatar};