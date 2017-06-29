'use strict';

//requirements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likeList: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Post', Post);
