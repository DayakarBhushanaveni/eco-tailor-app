const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  impactScore: String,
  priceCategory: String,
  source: String,
  image: String
});

module.exports = mongoose.model('Material', MaterialSchema);