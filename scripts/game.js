
var boxes = 23*12;;
var clickedButton; //npr 04, 12

var bluePoints = 0;
var greenPoints = 0;
var turn ="blue";

function submitAnswer() {
    
    $("#"+clickedButton).css ({
        backgroundColor: "#c4ffc9",
        pointerEvents: "none"
    });
    
    checkBug(clickedButton);
    
    if (turn == "blue"){
        bluePoints++;
        $("#blueP").html(bluePoints);
        changeTurn(turn);
    }
    else {
        greenPoints++;
        $("#greenP").html(greenPoints);
        changeTurn(turn);
    }

    boxes--;
    if (boxes == 0) {
        gameOver();
    }
    
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
    
    if (turn == "blue"){
        turn = "green";
        $("#greenTeamId").toggleClass("greenActive").toggleClass("notActive");;
        $("#blueTeamId").toggleClass("blueActive").toggleClass("notActive");
    } else {
        turn = "blue";
        $("#greenTeamId").toggleClass("greenActive").toggleClass("notActive");
        $("#blueTeamId").toggleClass("blueActive").toggleClass("notActive");
    }
}

function getQuestion(buttonID) {

    var fields = buttonID.split('-');
    var x = parseInt(fields[0]),
        y = parseInt(fields[1]);
    return JSON.parse(localStorage.grid)[x][y];
}

function checkBug(buttonID) {
    var questionObj = getQuestion(buttonID);
    if(questionObj.hasBug){
        document.getElementById(clickedButton).style.backgroundImage = "url('assets/images/ladybug.png')";
    }
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

