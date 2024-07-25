const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  igId: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number },
  photo: { type: String, required: false },
  comments: { type: [String] },
  sentiment: {
    positive: { type: Number },
    negative: { type: Number },
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

mongoose.model('Post', postSchema);
