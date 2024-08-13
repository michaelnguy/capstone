const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  igId: { type: String, required: false },
  body: { type: String, required: false },
  likes: { type: Number },
  igTimestamp: { type: String, required: false },
  media_url: { type: String, required: false },
  permalink: { type: String, required: false },
  comments: { type: [String] },
  sentiment: {
    positive: { type: Number },
    negative: { type: Number },
    neutral: { type: Number },
  },
  tags: [{ type: String }],
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

mongoose.model('Post', postSchema);
