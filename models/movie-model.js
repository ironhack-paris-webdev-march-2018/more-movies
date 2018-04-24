const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageName: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, {
  timestamps: true
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
