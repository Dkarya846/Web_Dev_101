const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello Dkarya</h1><p>I am the first server</p>");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
