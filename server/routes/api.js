//requirements
const express = require('express');
const Post = require('../models/posts');
const User = require('../models/users');

const app = module.exports = express.Router();

app.post('/api/add-post', (req, res) => {
  const {
    title,
    username,
    imageUrl
  } = req.body;
  if (req.isAuthenticated()) {
    let post = new Post({
      title: title,
      username: username,
      imageUrl: imageUrl,
    });
    post.save((err, post) => {
      if (err) {
        throw err;
      }
    });
    res.status(201).send('Post added to db')
  } else {
    res.status(401).send('Login required');
  }
});


app.post('/api/remove-post', (req, res) => {
  const {
    id,
    username
  } = req.body;
  if (req.isAuthenticated()) {
    Post.findById(id, (err, post) => {
      if (err) {
        throw err
      } else {
        if (post.username === username) {  //Prevent users deleting other users posts
          post.remove(err => {
            if (err) throw err;
            res.status(201).send('Post removed from db');
          })
        } else {
          res.status(401).send('Unable to delete');
        }
      }
    });
  } else {
    res.status(401).send('Login Required');
  }
});

app.post('/api/add-like', (req, res) => {
  const {
    id,
    username
  } = req.body;
  if (req.isAuthenticated()) {
    Post.findById(id, (err, post) => {
      if (err) {
        throw err;
      } else if (!post.likeList.includes(username)) { //prevent multiple likes to same post
        post.likes += 1;
        post.likeList.push(username);
        post.save(err => {
          if (err) throw err;
          res.status(201).send('Added Like');
        })
      } else {
        res.status(401).send("You've already liked this post")
      }
    });
  } else {
    res.status(401).send('Login Required')
  }
});

app.get('/api/get-posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (posts) {
      res.status(201).send(posts);
    } else if (err) {
      throw err;
    }
  });
});
