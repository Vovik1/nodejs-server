const mongoose = require('mongoose');

const Lecture = mongoose.model('Lecture');
const User = mongoose.model('User');

async function getAll(req, res) {
  try {
    const docs = await Lecture.find();
    const lectures = docs.map((doc) => {
      return {
        id: doc._id,
        imgUrl: doc.imgUrl,
        title: doc.title,
        author: doc.author,
        defaultRating: doc.defaultRating,
        videoUrl: doc.videoUrl,
        description: doc.description,
        categoryId: doc.categoryId,
        categoryTitle: doc.categoryTitle,
      };
    });
    res.status(200).json(lectures);
  } catch (err) {
    res.json(err);
  }
}

async function getLecturesByCategory(req, res) {
  try {
    const docs = await Lecture.find({ categoryId: req.params.categoryid });
    const lectures = docs.map((doc) => {
      return {
        id: doc._id,
        imgUrl: doc.imgUrl,
        title: doc.title,
        author: doc.author,
        defaultRating: doc.defaultRating,
        videoUrl: doc.videoUrl,
        description: doc.description,
        categoryId: doc.categoryId,
        categoryTitle: doc.categoryTitle,
      };
    });
    res.status(200).json(lectures);
  } catch (err) {
    res.json(err);
  }
}

async function userAddFavourites(req, res) {
  try {
    const lecture = await Lecture.findById(req.params.lectureid);
    const user = await User.findByIdAndUpdate(
      req.userData._id,
      {
        $addToSet: { favouriteLectures: lecture },
      },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
}

async function userDeleteFavourites(req, res) {
  try {
    await User.findByIdAndUpdate(
      req.userData._id,
      {
        $pull: { favouriteLectures: { $in: [req.params.lectureid] } },
      },
      {
        new: true,
      }
    );
    res.status(204).json(null);
  } catch (err) {
    res.json(err);
  }
}

function getUserFavouriteLectures(req, res) {
  let favouriteLectures;
  User.findOne({ email: req.userData.email })
    .populate('favouriteLectures', ['title', 'author', 'imgUrl', 'description'])
    .exec((err, user) => {
      if (err) {
        return res.status(404).json(err);
      }
      favouriteLectures = user.favouriteLectures;
      return res.json({ favouriteLectures });
    });
}

async function getOne(req, res) {
  try {
    const doc = await Lecture.findById(req.params.lectureid);
    if (!doc) return res.sendStatus(404);
    const post = {
      id: doc._id,
      imgUrl: doc.imgUrl,
      title: doc.title,
      author: doc.author,
      defaultRating: doc.defaultRating,
      oldPrice: doc.oldPrice,
      newPrice: doc.newPrice,
      videoUrl: doc.videoUrl,
      description: doc.description,
      messages: doc.messages,
    };
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function lectureCreate(req, res) {
  try {
    const newLecture = new Lecture({
      title: req.body.title,
      author: req.author,
      imgUrl: req.body.imgUrl,
      videoUrl: req.body.videoUrl,
      description: req.body.description,
      messages: req.body.messages,
      userId: req.userData._id,
    });
    const lecture = await newLecture.save();
    res.status(201).json(lecture);
  } catch (err) {
    res.status(400).json(err);
  }
}

function lectureUpdate(req, res) {
  if (!req.params.lectureid) {
    return res
      .status(404)
      .json({ message: 'Not found, lectureid is required' });
  }
  Lecture.findById(req.params.lectureid).exec((err, lec) => {
    if (!lec) {
      return res.json(404).status({ message: 'lectureid not found' });
    }
    if (err) {
      return res.status(400).json(err);
    }
    Object.assign(lec, req.body);
    lec.save((error, lecture) => {
      if (error) {
        return res.status(404).json(err);
      }
      return res.status(200).json(lecture);
    });
  });
}

function lectureRemove(req, res, next) {
  const { lectureid } = req.params;
  if (lectureid) {
    Lecture.findByIdAndRemove(lectureid).exec((err, lecture) => {
      if (err) {
        return res.status(404).json(err);
      }
      if (lecture.videoUrl.includes(process.env.AWS_BUCKET)) {
        req.videoUrl = lecture.videoUrl;
        return next();
      }
      res.status(204).json(null);
    });
  } else {
    res.status(404).json({ message: 'No Lecture' });
  }
}

module.exports = {
  getAll,
  getLecturesByCategory,
  userAddFavourites,
  userDeleteFavourites,
  getOne,
  getUserFavouriteLectures,
  lectureCreate,
  lectureUpdate,
  lectureRemove,
};
