require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY || SECRET_KEY,
    { expiresIn: '360h' }
  );
}

router.post('/signup', (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: 'please fill in all fields' });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'User already exists with that email' });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: 'user created successfully' });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: 'Please provide email or password' });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      res.status(422).json({ error: 'Invalid Email or Password' });
      return;
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((isMatch) => {
        if (isMatch) {
          // res.json({ message: 'successfully signed in' });
          const token = generateToken(savedUser);
          const { _id, name, email } = savedUser;
          res.json({
            token,
            user: { _id, name, email },
          });
        } else {
          res.status(422).json({ error: 'Invalid Email or Password' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
