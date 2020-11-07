var buttonColours = ["red", "blue", "green", "yellow"]
var userClickedPattern = [];
var level = 0;
var gameSequence = [];
$(document).one("keypress", function () {
    nextSequence();
})

function nextSequence() {
    level++;
    $('#level-title').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gameSequence.push(randomChosenColour);
    var button = $("#" + randomChosenColour);
    button.fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


var buttons = $('.btn')
    buttons.click(function (event) {
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        console.log(userClickedPattern);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    })

    function playSound(name) {
        var audiofile = name + ".mp3";
        var audio = new Audio("sounds/" + audiofile);
        audio.play()
    }

    function animatePress(currentColour) {
        var button = $("#" + currentColour);
        button.addClass("pressed");
        setTimeout(function () {
            button.removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] == gameSequence[currentLevel]) {
            setTimeout(function () {
                for (let index = 0; index < level; index++) {
                    nextSequence();
                }
                userClickedPattern = [];
            }, 1000);
        } else {
            console.log("failed");
        }
    }