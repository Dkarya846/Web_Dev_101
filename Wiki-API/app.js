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
  }, content: {
    type: String,
    required: true
  }
})

const Article = mongoose.model("Article", articlesSchema);


//Handles Get request for articles routes

app.route("/articles")
  .get((req, res) => {
    Article.find((err, articles) => {
      if (!err) {
        return res.send(articles);
      } else {
        res.send(err);
      }
    });
  })

  .post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const article = new Article({
      title, content
    });

    article.save((err) => {
      if (!err) {
        res.send("Successfully saved the article.", 200)
      }
      else {
        res.send(err);
      }
    })

  })

  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) {
        res.send("Successfully deleted all articles", 200);
      }
      else {
        res.send(err);
      }
    })
  })


app.route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, article) => {
      console.log(article, err);
      if (article) {
        res.send(article);
      }
      else {
        res.send("Article Not Found", 404);
      }
    })
  })

  .put((req, res) => {
    console.log("/get", req.params.articleTitle, req.body.title, req.body.content)
    Article.replaceOne({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }, (err) => {
      if (!err) {
        res.send("Article Updated Successfully");
      } else {
        res.send(err);
      }
    });
  })

  .patch((req, res) => {
    Article.updateOne({ title: req.params.articleTitle }, { $set: req.body }, (err) => {
      if (!err)
        res.send("Article Updated Successfully");
      else {
        res.send(err);
      }
    })
  })

  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err, deleted) => {
      if (!err && deleted.deletedCount) {
        res.send("Article Deleted Successfully.");
      }
      else if (!deleted.deletedCount)
        res.send("Article Does Not Found", 404);
      else {
        res.send(err);
      }
    })
  })


app.listen("3000", () => {
  console.log("Server started successfully");
})