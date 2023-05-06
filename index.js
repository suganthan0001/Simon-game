function pressedEffect(event){
    var id1 = event.target.id;
    $("#"+id1).addClass("pressed");
    setTimeout(function(){
        $("#"+id1).removeClass("pressed");
    },100);
}

function nextSequence(){
    var randomNum = Math.floor((Math.random() * 4) + 1);
    $("#"+randomNum).fadeToggle(100).fadeToggle(100);
    gameSequence.push(randomNum);
    playSound(randomNum);
    userSequence = [];
}

function playSound(num){
    switch(num){
        case 1:
            blue.play();
            break;
        case 2:
            red.play();
            break;
        case 3:
            yellow.play();
            break;
        case 4:
            green.play();
            break;
        
    }
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}


var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var wrong = new Audio("sounds/wrong.mp3");
var yellow = new Audio("sounds/yellow.mp3");

var start = false;
var level = 1;

var gameSequence = [];
var userSequence = [];
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        setTimeout(nextSequence,1000);
        start = True;
    }
});


$(".btn").click(function(event){
    pressedEffect(event);
    playSound(buttonID);
    var buttonID = Number(event.target.id);
    userSequence.push(buttonID);
    checkAns();
    
});

function wrongAns(){
    gameOver();
    wrong.play();

    level = 0;
    gameSequence = [];
    userSequence = [];
    start = false;
    setTimeout(function(){
        location.reload()
    },500);
}

function checkAns(){
    for(var j=0;j<userSequence.length;j++){
        if(gameSequence[j] != userSequence[j]){
            wrongAns();
        }
    }
    if(userSequence.length == gameSequence.length){
        setTimeout(nextSequence,1000);
        level++;
        $("#level-title").text("Level "+level);
    }
}