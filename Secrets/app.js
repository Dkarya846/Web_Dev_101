//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = mongoose.Schema({
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
    console.log(user);
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        console.log("User Not Found");
      } else {
        if (user.password === req.body.password) res.render("secrets");
      }
    }
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const user = new User({
    email: req.body.username,
    password: req.body.password,
  });

  user.save((err) => {
    if (!err) {
      console.log("User added successfully");
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started successully");
});
