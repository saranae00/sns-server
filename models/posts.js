const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  content: String,
  tags: Array,
  publishedDate: {
    type: Date,
    default: Date.now
  },
  member: {
    _id: mongoose.Types.ObjectId,
    memberId: String
  }
});

const post = mongoose.model('post', postSchema);

module.exports = post;
