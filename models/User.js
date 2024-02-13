const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: String,
  // enrollmentNo: Number,
  mobileNo: Number,
  password: String,
  pdfFiles: [{ type: Schema.Types.ObjectId, ref: 'PDFFile' }],
});

module.exports = mongoose.model('User', userSchema);

