const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const deleteFile = (req, res) => {
  const slashIndex = req.videoUrl.lastIndexOf('/');
  const keyFile = req.videoUrl.slice(slashIndex + 1, req.videoUrl.length);
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: keyFile,
  };

  s3.deleteObject(params, (err, data) => {
    if (data) {
      res.status(204).json(null);
    } else {
      res.status(422).json(err);
    }
  });
};

module.exports = deleteFile;
