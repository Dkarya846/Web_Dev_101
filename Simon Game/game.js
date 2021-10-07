//Global variables

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomChosenColour;
var isStarted = false;
var level = 0;

//Generates the next random sequence
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  level++;
  $("#level-title").text("Level " + level);
}

//Plays Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then((_) => {}).catch((error) => {});
  }
}

//Click Event Handler for Buttons
$(".btn").click(function (e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Animating button on click
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//event listener for key presses
$(document).keydown(function () {
  if (!isStarted) {
    nextSequence();
    $("#level-title").text("Level " + level);
  }
  isStarted = true;
});

//Check Answer function
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Restart Game Method
function startOver() {
  level = 0;
  isStarted = false;
  gamePattern = [];
}
