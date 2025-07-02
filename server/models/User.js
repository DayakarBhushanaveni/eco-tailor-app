const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  measurements: String,
  savedDesigns: [String],
  sustainabilityScore: Number,
  rewards: Number
});

module.exports = mongoose.model('User', UserSchema);