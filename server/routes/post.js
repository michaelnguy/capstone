const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const axios = require('axios');

const dummyPosts = require('../dummyPosts');

router.post('/create_dummy_data', requireLogin, async (req, res) => {
  let dataToSend = [
    'hello this is great',
    '😂',
    'dayum',
    'Stop my favourite internet grandma follows you😭😭😭',
    'Bro got a demo',
    'You gonna pay for my therapy',
    'What a horrible day to have vision',
    '😂😂😂😂',
  ];
  res.json('hit route');
  try {
    const response = await axios.post('http://localhost:5000/predict', {
      texts: dataToSend,
    });

    // Handle the response from the Flask server
    console.log(response.data);
  } catch (error) {
    console.error('Error making request to Flask server:', error);

    // Handle the error
    res.status(500).json({
      message: 'Error sending data',
      error: error.message,
    });
  }

  // const post = new Post({ title, body, photo: pic, postedBy: req.user });
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

router.get('/allposts', requireLogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});

router.get('/getfollowingposts', requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});

router.get('/myposts', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .then((myposts) => res.json({ myposts }))
    .catch((err) => {
      console.log(err);
    });
});

router.put('/like', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});
router.put('/unlike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

module.exports = router;
