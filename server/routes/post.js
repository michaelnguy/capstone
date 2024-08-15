const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const axios = require('axios');

const dummyPosts = require('../util/dummyPostsTide');

router.post('/create_dummy_data', requireLogin, async (req, res) => {
  try {
    await Post.deleteMany({ owner: req.user._id });

    for (let i = 0; i < dummyPosts.length; i++) {
      let {
        igId,
        body,
        likes,
        media_url,
        permalink,
        comments,
        timestamp,
        tags,
      } = dummyPosts[i];
      let response;

      try {
        response = await axios.post('http://localhost:5000/predict', {
          texts: comments,
        });

        // Handle the response from the Flask server

        console.log(response.data);
      } catch (error) {
        console.error('Error making request to Flask server:', error);
        return res.status(500).json({
          message: 'Error sending data',
          error: error.message,
        });
      }

      let sentiment = { positive: 0, negative: 0, neutral: 0 };
      response.data.forEach((comment) => {
        if (comment.sentiment == 1) {
          sentiment.positive += 1;
        } else if (comment.sentiment == 0) {
          sentiment.neutral += 1;
        } else {
          sentiment.negative += 1;
        }
      });

      const post = new Post({
        igId,
        body,
        likes,
        igTimestamp: timestamp,
        media_url,
        permalink,
        comments,
        sentiment,
        tags,
        owner: req.user,
      });

      await post.save();
    }

    res.status(201).send('All posts saved successfully');
  } catch (err) {
    console.error('Error saving the post:', err);
    res.status(500).send('Error saving the post');
  }
});

router.post('/get_hashtags', requireLogin, async (req, res) => {
  try {
    response = await axios.post('http://localhost:5000/get_hashtags', {
      image_url: req.body.image_url,
    });

    // Handle the response from the Flask server
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: 'Error sending data',
      error: error.message,
    });
  }
});

//Get posts
router.get('/posts', requireLogin, (req, res) => {
  const userId = req.user._id;

  Post.find({ owner: userId })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Error fetching posts' });
    });
});

//Get single post
router.get('/getpost', requireLogin, (req, res) => {
  // console.log(req.query.postId);
  Post.find({ igId: req.query.postId })
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
