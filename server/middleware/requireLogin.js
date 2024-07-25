require('dotenv').config();

const mongoose = require('mongoose');
const User = mongoose.model('User');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'you must be logged in to do that' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'you must be logged in' });
    }

    const { id } = payload;
    User.findById(id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
