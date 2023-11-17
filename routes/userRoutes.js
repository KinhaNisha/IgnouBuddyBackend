const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PDFFile = require('../models/pdfFile');
const auth = require('../middlewares/auth'); 

// Route to get user details by ID
router.get('/', async (req, res) => {
  try {
    const userId = getUserIdFromHeader(req.headers);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId).populate('pdfFiles');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to associate a PDF file with a user
router.post('/:userId/pdf', async (req, res) => {
  try {
    const { category, semester, subject, pdfLink } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const pdfFile = new PDFFile({ category, semester, subject, pdfLink });
    await pdfFile.save();

    user.pdfFiles.push(pdfFile);
    await user.save();

    res.json({ user, pdfFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
