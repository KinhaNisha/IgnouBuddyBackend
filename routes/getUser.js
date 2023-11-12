const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Define a route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
});

module.exports = router;
