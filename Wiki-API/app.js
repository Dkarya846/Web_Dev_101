const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view-engine", "ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articlesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
})

const Article = mongoose.model("Article", articlesSchema);


app.get("/articles", (req, res) => {
  Article.find((err, articles) => {
    if (!err) {
      return res.send(articles);
    } else {
      res.send(err);
    }
  });
})

app.listen("3000", () => {
  console.log("Server started successfully");
})