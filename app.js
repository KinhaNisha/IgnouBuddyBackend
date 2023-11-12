const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://sachinkinha:SachinKinha@cluster0.ourbjr9.mongodb.net/api')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes
const auth = require('./middlewares/auth');
const registration = require('./routes/registration');
const login = require('./routes/login');
const getUserRouter = require('./routes/getUser');

app.use('/api/auth', auth);
app.use('/api/register', registration);
app.use('/api/login', login);
app.use('/api/users', getUserRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
