const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', async (req, res) => {
  console.log("register route running")
  const { username, email,/* enrollmentNo,*/ mobileNo, password } = req.body;
  console.log({enrollmentNo})
  console.log({mobileNo})
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Check if the usersenrollment no. exists or not
  // const existingUserEnrollmentNo = await User.findOne({ enrollmentNo });
  // if (existingUserEnrollmentNo) {
  //   return res.status(400).json({ message: 'Enrollement number already exists' });
  // }

  // Check if the mobile no already exists
  const existingMobileNo = await User.findOne({ mobileNo });
  if (existingMobileNo) {
    return res.status(400).json({ message: 'Mobile number already exists' });
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const newUser = new User({ username, email,/* enrollmentNo,*/ mobileNo, password: hashedPassword });
  console.log(newUser)
  try {
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;

