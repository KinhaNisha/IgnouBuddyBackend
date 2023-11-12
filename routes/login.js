const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

router.post('/', async (req, res) => {
  console.log("login route running")
  const {mobileNo, password } = req.body;
  console.log({mobileNo, password})
  // Check if the user exists
  const user = await User.findOne({ mobileNo });
  // const userenrol = await User.findOne({enrollmentNo})
  if (!user) {
    return res.status(404).json({ message: 'Mobile number not found' });
  }
  console.log(user)
  // Verify the password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(404).json({ message: 'Wrong Password' });
  }

  // Generate a token for the user
  const token = jwt.sign({ userId: user._id, email: user.email, enroll: user.enrollmentNo, mobile: user.mobileNo }, config.secret, {
    expiresIn: '1h',
  });
console.log(token)
  res.status(200).json({
    message: 'Login successful',
    token,
  });
});

module.exports = router;
