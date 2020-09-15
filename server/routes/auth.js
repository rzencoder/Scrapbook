//requirements
const express = require("express");
const passport = require("passport");
const GithubStrategy = require("passport-github");
const User = require("../models/users");
require("dotenv").config();

const app = (module.exports = express.Router());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CONSUMER_KEY,
      clientSecret: process.env.GITHUB_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("profile");
      console.log(profile);
      process.nextTick(() => {
        User.findOne(
          {
            username: profile.username,
          },
          (err, user) => {
            if (err) {
              return done(err);
            }
            if (user) {
              return done(null, user);
            } else {
              var newUser = new User();
              newUser.username = profile.username;
              newUser.save((err) => {
                if (err) {
                  console.log("error");
                  throw err;
                }
                console.log("newUser");
                console.log(newUser);
                return done(null, newUser);
              });
            }
          }
        );
      });
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback/",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.post("/auth/verify", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(201).send({
      username: req.user.username,
    });
  } else {
    res.status(403).send({
      error: "Not Authorized",
    });
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
