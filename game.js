var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

// Picks random color and plays the sound
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

var gameHasStarted = false;
var level = 0;

$(document).keydown(function(event) {

  if (event.key === "a" && !gameHasStarted) {
    nextSequence();
    gameHasStarted = true;
    $("#level-title").text("Level " + level);
  };
})

var userClickedPattern = [];

$(".container .row div").click(function () {
  // var userChosenColour1 = this.id;
  var userChosenColor = $(this).attr("id");

  playSound($(this).attr("id"));
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length);
});

function checkAnswer(currentColor) {
  // if (userClickedPattern[currentColor - 1] === gamePattern[gamePattern.length - 1]) {
  if (userClickedPattern[currentColor - 1] === gamePattern[currentColor - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }

  else {
    var wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press A Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameHasStarted = false;
}



// Play sound of the color
function playSound(color) {
  switch (color) {
    case "red":
      var redSound = new Audio("./sounds/red.mp3");
      animatePress(color);
      redSound.play();
      break;
    case "blue":
      var blueSound = new Audio("./sounds/blue.mp3");
      blueSound.play();
      animatePress(color);
      break;
    case "green":
      var greenSound = new Audio("./sounds/green.mp3");
      greenSound.play();
      animatePress(color);
      break;
    case "yellow":
      var yellowSound = new Audio("./sounds/yellow.mp3");
      yellowSound.play();
      animatePress(color);
      break;
    default:
      console.log("Error");
      break;
  }
}

// Makes button flash
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}