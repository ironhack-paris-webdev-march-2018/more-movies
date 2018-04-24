const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const Movie = require('../models/movie-model');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
});

const storage =
  cloudinaryStorage({
    cloudinary,
    folder: 'more-movies'
  });

const upload = multer({ storage });

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-form');
});

router.post('/process-movie',
  upload.single('blahUpload'),
  (req, res, next) => {
    const { title, description } = req.body;
    const { originalname, secure_url } = req.file;

    Movie.create({
      title,
      description,
      imageName: originalname,
      imageUrl: secure_url
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
  });

module.exports = router;
