const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello Dkarya</h1><p>I am the first server</p>");
});

app.get("/contact", (req, res) => {
  res.send("Contact me at dkarya.delhi.uk@gmail.com");
});

app.get("/about", (req, res) => {
  res.send(
    "<title>About</title><h1>Hi, I am Deepak.</h1> <h2>I am a FullStack Web Developer :)</h2>"
  );
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
