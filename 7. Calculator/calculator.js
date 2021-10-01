const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  res.send(
    "The result is " + (parseInt(req.body.num1) + parseInt(req.body.num2))
  );
});

app.get("/bmiCalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", (req, res) => {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var bmi = weight / Math.pow(height, 2);
  res.send("Your BMI is " + bmi.toPrecision(4));
});

app.listen(3000, () => console.log("Server started on port 3000"));
