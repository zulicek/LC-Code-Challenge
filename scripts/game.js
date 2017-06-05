
var boxes = 23*12;;
var clickedButton; //npr 04, 12

var bluePoints = 0;
var greenPoints = 0;
var turn =0;

function submitAnswer() {
    activePlayer = players[turn];
    
    $("#"+clickedButton).css ({
        backgroundColor: activePlayer.color,
        pointerEvents: "none"
    });
    
    changeTurn()
    console.log(document.getElementById("answer").value);
}


function wrongAnswer() {
    if (turn == "blue") {
        $("#blueP").html(bluePoints);
        changeTurn(turn);
    }
    else {
        $("#greenP").html(greenPoints);
        changeTurn(turn);
    }
}

function changeTurn(){
    
    if (turn == numberOfPlayers-1){
        $("#player"+turn).toggleClass("active");
        turn = 0;
        $("#player"+turn).toggleClass("active");
    } else {
        $("#player"+turn).toggleClass("active");
        turn += 1;
        $("#player"+turn).toggleClass("active");
    }
}

function getQuestion(buttonID) {

    var fields = buttonID.split('-');
    var x = parseInt(fields[0]),
        y = parseInt(fields[1]);
    return JSON.parse(localStorage.grid)[x][y];
}


function setIdClickedButton(buttonID) {
    clickedButton = buttonID;
    var questionObj = getQuestion(clickedButton);
    $("#question").text(questionObj.question);
    console.log(buttonID);
}


function gameOver(){
    alert("Gotova igra");
}

