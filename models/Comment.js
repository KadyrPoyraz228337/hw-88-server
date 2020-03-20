const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datetime: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('Comment', CommentSchema);