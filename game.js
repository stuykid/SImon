let buttonColors = ["red", "blue", "green", "yellow"]; // array of colors for simon game

let gamePattern = [];                                  // empty array to store random chosen colors

let userClickedPattern = [];                           // empty array to store user clicks 

let started = false;
let level = 0;

$(document).keypress(function(){                       // detect when a key has been pressed, when that happens for the first time, call nextSequence()
    
    if(!started) {
        $("#level-title").text("Level " + level);      // title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
        nextSequence();
        started = true;
    };
});

$(".btn").on("click", function(){                      // Event listener to detect when any of the buttons are clicked and trigger a handler function */
    let userChosenColor = $(this).attr("id");          // store the id of the button that got clicked.
    userClickedPattern.push(userChosenColor);          // Add the contents of the variable userChosenColour to array
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
});


function nextSequence() {
    userClickedPattern = [];                            // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    let randomNumber = Math.floor(Math.random() * 4);   // create a random number between 0 and 3
    let randomChosenColor = buttonColors[randomNumber]; // random color from array
    gamePattern.push(randomChosenColor);                // push random color into new array

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); // animate a flash to the button
    playSound(randomChosenColor);
    level++;                                            // increase the level by 1 every time nextSequence() is called
    $("#level-title").text("Level " + level);           // update the h1 with this change in the value of level.
};


function playSound(name) {                              // plays sounds based on color chosen */
    
    let sound = new Audio("./sounds/" + name + ".mp3"); // play the sound for the button colour
    sound.play();
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");          // add this pressed class to the button that gets clicked inside animatePress()

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");   // remove the pressed class after a 100 milliseconds.
    }, 100);
};

function checkAnswer(currentLevel) {                    // check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
        
    } else {
        playSound("wrong");                             // play "wrong" sound from sounds
        $("body").addClass("game-over");                // add class to body to signal game over
        $("#level-title").text("Game Over, Press any key to restart"); // reset h1 text 

        setTimeout(function(){
            $("body").removeClass("game-over");         // remove game over class after 200 milliseconds
        }, 200);
        startOver();                                    // start the game over
    }
};

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}