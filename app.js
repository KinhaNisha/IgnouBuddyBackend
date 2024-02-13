const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const userRoutes = require('./routes/userRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

// Connect to MongoDB
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://sachinkinha:sachinkinha@cluster0.ourbjr9.mongodb.net/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());

const auth = require('./middlewares/auth');
const registration = require('./routes/registration');
const login = require('./routes/login');
const getUserRoute = require('./routes/getUser');

app.use('/api/auth', auth);
app.use('/api/register', registration);
app.use('/api/login', login);
app.use('/api/getusers', getUserRoute);
app.use('/api/users', userRoutes);
app.use('/pdf', pdfRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
