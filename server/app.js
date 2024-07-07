require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const uri =
  'mongodb+srv://mqnguy:3RGzrHg0Mpyu0n4y@capstone.qhenjcs.mongodb.net/?appName=capstone';

mongoose.connection.on('connected', () =>
  console.log('connected to MongoDB Atlas')
);

mongoose.connect(uri);

require('./models/user');
require('./models/post');

app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
