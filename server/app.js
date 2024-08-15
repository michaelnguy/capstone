require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

const MONGO_DB_PW = process.env.MONGODB_ATLAS_PW;

const uri = `mongodb+srv://mqnguy:${MONGO_DB_PW}@capstone.qhenjcs.mongodb.net/?appName=capstone`;

mongoose.connection.on('connected', () =>
  console.log('Connected to MongoDB Atlas')
);

mongoose.connect(uri);

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(cors());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(PORT, () => {
  console.log('Server is running');
});
