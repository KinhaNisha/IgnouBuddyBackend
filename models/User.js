const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  enrollmentNo: Number,
  mobileNo: Number,
  password: String,
});

module.exports = mongoose.model('User', userSchema);

