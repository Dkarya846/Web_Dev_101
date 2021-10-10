const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", (req, res) => {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { day, items });
});

app.post("/", (req, res) => {
  var item = req.body.new_item;
  items.push(item);
  console.log(items);
  res.redirect("/");
});

app.listen("3000", () => {
  console.log("Server started at http://localhost:3000");
});
