// routes/pdfRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PdfFile = require('../models/pdfFile'); // Capitalize model imports to distinguish from variables

// Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 5000000}, // 5MB limit
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('pdfFile');

// Check file type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDFs Only!');
  }
}

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      return res.status(500).json({ message: err.message });
    } else {
      if(req.file == undefined){
        return res.status(400).json({ message: 'Error: No File Selected!' });
      } else {
        // TODO: Save the file information to your database if needed

        // Return the response
        return res.status(200).json({
          message: 'File Uploaded Successfully!',
          filePath: `/uploads/${req.file.filename}`
        });
      }
    }
  });
});

// Route to get a PDF file by category and subject
router.get('/:category/:semester/:subject', async (req, res) => {
  try {
    const { category, semester, subject } = req.params;
    const pdf = await PdfFile.findOne({ category, semester, subject }); // Changed the variable name

    if (!pdf) {
      return res.status(404).json({ message: 'PDF file not found' });
    }

    return res.json({ pdfLink: pdf.pdfLink });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
