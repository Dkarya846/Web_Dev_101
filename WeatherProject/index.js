const { response } = require("express");
const express = require("express");

const https = require("https");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is up and running...");
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=47657b66139fc2cb733e7566ec239fd1&units=metric",
    (response) => {
      console.log(response);
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on 3000");
});
