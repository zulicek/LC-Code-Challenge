
var newPosition = [];
var turn =0;
var cubeNumber = 6;
var answeredQuestions = create2DArray(noRows,noColumns);
var tocan = 1;


function submitAnswer() {

    var questionObj = getQuestion(newPosition[0] + "-" +  newPosition[1]);
    var answer = document.getElementById("answer").value;


    if (questionObj.answer == answer) { 

        players[turn].positionRow = newPosition[0];
        players[turn].positionColumn = newPosition[1];
        players[turn].score++;

        var colorButton = newPosition[0] + "-" +  newPosition[1];
        
        $("#"+colorButton).css ({
            backgroundColor: players[turn].color,
            pointerEvents: "none"
        });

        answeredQuestions[newPosition[0]][newPosition[1]] = 1;

    }
     
   $("#answer").val(''); 
    changeTurn();
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

//dok kliknem na kocku zove se ova funkcija
function setNewPosition() {
    cubeBefore = cubeNumber;
    cubeNumber = getRandom(1,6);

    var cubeButton = document.getElementById("cubeButton");
    $(cubeButton).removeClass("cubeButton"+cubeBefore).addClass("cubeButton"+cubeNumber);

    findNewPosition(players[turn].positionRow, players[turn].positionColumn);

    var questionObj = getQuestion(newPosition[0] + "-" +  newPosition[1]);
    $("#question").text(questionObj.question);
     $('#myModal').modal('show');

}


function findNewPosition(currentRow, currentColumn) {
    if (currentRow == 0) {
        if ((currentColumn + cubeNumber) >= noColumns) newPosition = angle1(currentRow,currentColumn);
        else {
            newPosition[0] = currentRow;
            newPosition[1] = currentColumn + cubeNumber;
            if (answeredQuestions[newPosition[0]][newPosition[1]] == 1){
                while (answeredQuestions[newPosition[0]][newPosition[1]] == 1) {
                    newPosition[1]++;
                    if (newPosition[1] == noColumns) newPosition = angle1(newPosition[0],newPosition[1]);
                }
            }
        }
    }

    else if (currentColumn == noColumns-1){
        if ((currentRow + cubeNumber) >= noRows) newPosition = angle2(currentRow,currentColumn);
        else {
            newPosition[0] = currentRow + cubeNumber;
            newPosition[1] = currentColumn;

            if (answeredQuestions[newPosition[0]][newPosition[1]] == 1){
                while (answeredQuestions[newPosition[0]][newPosition[1]] == 1) {
                    newPosition[0]++;
                    if (newPosition[0] == noRows) newPosition = angle2(newPosition[0],newPosition[1]);
                }
            }
        }
    }

    else if (currentRow == noRows-1) {
        if (cubeNumber > currentColumn) newPosition = angle3(currentRow, currentColumn); 
        else {
            newPosition[0] = noRows - 1;
            newPosition[1] = currentColumn - cubeNumber;

            if (answeredQuestions[newPosition[0]][newPosition[1]] == 1){
                while (answeredQuestions[newPosition[0]][newPosition[1]] == 1) {
                    newPosition[1]--;
                    if (newPosition[0] < 0) newPosition = angle3(0,newPosition[1]);
                }
            }
        }
    }

    else if (currentColumn == 0){
        if ((currentRow - cubeNumber) <= 0) gameOver();
        else {
            newPosition[0] = currentRow - cubeNumber;
            newPosition[1] = 0;

            if (answeredQuestions[newPosition[0]][newPosition[1]] == 1){
                while (answeredQuestions[newPosition[0]][newPosition[1]] == 1) {
                    newPosition[0]--;
                    if (newPosition[0] <= 0) gameOver();
                }
            }
        }
    }

    

}

function angle1(currentRow, currentColumn){
    var position = [];

    position[0] = cubeNumber - (noColumns - currentColumn -1); 
    position[1] = noColumns - 1;

    if (answeredQuestions[position[0]][position[1]] == 1){
            while (answeredQuestions[position[0]][position[1]] == 1) {
                position[0]++;
            }
    }

    return position;
}

function angle2(currentRow, currentColumn) {
    var position = [];
    
    position[0] = noRows -1;
    position[1] = noColumns - 1 -(cubeNumber - (noRows -1 - currentRow));

    if (answeredQuestions[position[0]][position[1]] == 1){
            while (answeredQuestions[position[0]][position[1]] == 1) {
                position[1]--;
            }
    }
    console.log("Angle2" + position[0] + " " +position[1])

    return position;
}

function angle3(currentRow, currentColumn) {
    var position = [];
    position[0] = noRows - 1 - (cubeNumber - currentColumn);
    position[1] = 0;

    if (answeredQuestions[position[0]][position[1]] == 1){
            while (answeredQuestions[position[0]][position[1]] == 1) {
                position[0]--;
            }
    }

    return position;
}


function gameOver(){
    alert("Gotova igra");
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

