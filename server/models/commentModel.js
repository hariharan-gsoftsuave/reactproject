const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  creator: {
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creatorName: { type: String, required: true },
    creatorPhoto: { type: String, required: true }
  },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  comment: { type: String, required: true }
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields automatically
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
