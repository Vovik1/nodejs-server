const { v4: uuidv4 } = require('uuid');
const path = require( 'path' );
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3();


const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'bucket-u-vovika-for-avatars',
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
   console.log(uuidv4())
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

 

// function generatePresignedUrl(req,res) {
//   const params = {
//     Bucket: 'bucket-u-vovika-for-avatars',
//     Key: 'photo.png',
//     ACL: 'public-read',
//     Expires: 240
//   }

//   var url = s3.getSignedUrl('putObject', params) 
//   console.log('The Url is ', url);
//   res.status(200).json({url});
// }

module.exports = {uploadAvatar};