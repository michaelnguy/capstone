const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const axios = require('axios');

const dummyPosts = require('../util/dummyPosts');

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

      let sentiment = { positive: 0, negative: 0 };
      response.data.forEach((comment) => {
        if (comment.sentiment == 1) {
          sentiment.positive += 1;
        } else if (comment.sentiment == 0) {
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

router.post('/get_sentiment', (req, res) => {});

router.get('/fetch_ig', (req, res) => {
  const authId = '6680fbfa1e5f0d1a742bbd0f';

  const igUserId = '17841407394103172';
  const igUsernameToFetch = 'bluebottle';
  let accessToken =
    'EAAOAVTxW8c8BOw0GXgrntZAFhKxAFmaoKSZBrV9AMDWRw698PuNsmZA6XnuQrSKy8Qflb0JGRZAMNkGlzjVtfZArTwDf4S5upKWBORepvcESikO5vkA5xZCZBBxZASaq4eBUWuvxypPfnArfJnB7BZAqg6ScD4g1FAamDbpJLaQQl1v6S4ivvH1Cgow7qFZABwOo4ZAMHuD2qedydbaiq2ilgZDZD';
  const fbUrl = `https://graph.facebook.com/v20.0/${igUserId}?fields=business_discovery.username(${igUsernameToFetch}){followers_count,media_count,media{comments_count,like_count}}&access_token=${accessToken}`;

  const today = new Date().toISOString().split('T')[0];

  axios
    .get(fbUrl)
    .then(async (response) => {
      const followers =
        response['data']['business_discovery']['followers_count'];

      try {
        const user = await User.findOne({ _id: authId });
        console.log(user);
        if (user) {
          user.followerCount.set(today, followers);
          await user.save();
        }
        res.json({ response: response['data']['business_discovery'] });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: 'Failed to fetch data from Instagram API' });
    });
});

router.post('/createpost', requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: 'Please fill in all fields' });
  }
  const post = new Post({ title, body, photo: pic, postedBy: req.user });

  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

//Get post
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
