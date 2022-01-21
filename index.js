var buttonColours = ["rouge", "blue", "vert", "jaune"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("button").click(function () {

  if(!started) {   $("h1").text("Leve "+ level);
    nextSequence();
  started=true;  }
});
$("img").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
  if(gamePattern.length===userClickedPattern.length){
    setTimeout( function() {nextSequence();
  },1000);

} }else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  },500);
  startOver();
}
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
