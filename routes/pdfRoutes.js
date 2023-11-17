// routes/pdfRoutes.js

const express = require('express');
const router = express.Router();
const PDFFile = require('../models/pdfFile');

// Route to get a PDF file by category and subject
router.get('/:category/:semester/:subject', async (req, res) => {
  try {
    const { category, semester, subject } = req.params;
    const pdfFile = await PDFFile.findOne({ category, semester, subject });

    if (!pdfFile) {
      return res.status(404).json({ message: 'PDF file not found' });
    }

    return res.json({ pdfLink: pdfFile.pdfLink });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
