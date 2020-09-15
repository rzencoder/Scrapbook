//requirements
const express = require("express");
const path = require("path");
// const webpack = require("webpack");
// const config = require("./webpack.config.dev");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const expressSession = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("./server/models/users");
const apiRoutes = require("./server/routes/api");
const authRoutes = require("./server/routes/auth");
const cors = require("cors");

const app = express();
// // const compiler = webpack(config);
// app.use(cors);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, function (
  err
) {
  console.log(err);
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(apiRoutes);

// app.use(
//   require("webpack-dev-middleware")(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath,
//   })
// );

// app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, "client/build"))); // Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 3001, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening on port " + process.env.PORT);
});
