//jshint esversion:6

var superheroes = require("superheroes");
var supervillains = require("supervillains");

var mySuperneroName = superheroes.random();

console.log(mySuperneroName + " vs " + supervillains.random());
