//requirements
require('dotenv').load();
const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const User = require('../models/users');

const app = module.exports = express.Router();

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({
        'username': profile.username
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.username = profile.username;
          newUser.save(err => {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }
));

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback/',
  passport.authenticate('twitter', {
    failureRedirect: '/'
  }), (req, res) => {
    res.redirect('/profile');
  });

app.post('/auth/verify', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(201).send({
      username: req.user.username
    });
  } else {
    res.status(403).send({
      error: "Not Authorized"
    })
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
