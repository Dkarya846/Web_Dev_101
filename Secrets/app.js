//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.username }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        console.log("User Not Found");
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            res.render("secrets");
          }
        );
      }
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(process.env.SALTROUNDS);
  bcrypt.hash(password, parseInt(process.env.SALTROUNDS), function (err, hash) {
    // Store hash in your password DB.
    if (!err) {
      const user = new User({
        email: username,
        password: hash,
      });

      user.save((err) => {
        if (!err) {
          console.log("User added successfully");
          res.render("secrets");
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started successully");
});
