const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  numberOfWords: {
    type: Number,
    default: 0,
  },
  averageWordLength: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
