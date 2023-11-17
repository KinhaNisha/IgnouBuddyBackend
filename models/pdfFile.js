const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfFileSchema = new Schema({
  category: { type: String, required: true },
  semester: { type: Number, required: true },
  subject: { type: String, required: true },
  pdfLink: { type: String, required: true },
});

module.exports = mongoose.model('PDFFile', pdfFileSchema);
