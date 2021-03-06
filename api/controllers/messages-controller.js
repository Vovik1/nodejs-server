const mongoose = require('mongoose');

const Lecture = mongoose.model('Lecture');

const doAddMessage = (req, res, lecture) => {
  if (!lecture) {
    res.status(404).json({ message: 'Lecture not found' });
  } else {
    const { name } = req.userData;
    const { rating, messageText, imageUrl } = req.body;
    lecture.messages.push({
      author: name,
      rating,
      messageText,
      imageUrl,
    });

    lecture.save((err, lec) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const thisMessage = lec.messages.slice(-1).pop();
        req.app.io.to(lec.id).emit('send_message', thisMessage);
        res.status(201).json(thisMessage);
      }
    });
  }
};

const messagesCreate = (req, res) => {
  const { lectureid } = req.params;
  if (lectureid) {
    Lecture.findById(lectureid)
      .select('messages')
      .exec((err, lecture) => {
        if (err) {
          res.status(400).json(err);
        } else {
          doAddMessage(req, res, lecture);
        }
      });
  } else {
    res.status(404).json({ message: 'Lecture not found' });
  }
};

module.exports = { messagesCreate };
