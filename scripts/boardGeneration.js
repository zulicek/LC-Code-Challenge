var noRows = 12;
var noColumns = 23;
var numberOfPlayers = localStorage["numberOfPlayers"];


function parseInput() {
	var array = $("#paramForm").serializeArray();

	for (var i = 0; i < array.length; i++) {
		var pair = array[i];
		localStorage.setItem(pair["name"], parseInt(pair["value"]));
	}


	$('.page').hide();
	$('.loading-page').show();

	$.ajax({
		url: "assets/questions.json",
		type: "GET",
		dataType: "json",
		mimeType:"application/json"
	})
		.success(function(json) {
			generateBoard(json);
		})
		.fail(function(json) {
			alert("Server dieded :(");
		});
}

function shuffle(array) {
	var i = 0,
		j = 0,
		temp = null;

	for (i = array.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp; 
	}

	return array;
}

function create2DArray(rows, columns) {
	var array = new Array(rows);

	for (var i = 0; i < rows; i++) {
		array[i] = new Array(columns);
	}

	return array;
}

function generateBoard(json) {
	var questions = json;
	var numberOfPlayers = localStorage["numberOfPlayers"];
	var classNumber = localStorage["classNumber"];
	var unityNumber = localStorage["unityNumber"];
	var rows = noRows;
	var cols = noColumns;

	var quest = shuffle(questions["1"]);
	console.log(quest);

	var array = create2DArray(rows, cols);

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
				array[i][j] = createField(quest.pop(), i, j);
		}
	}

	var template_script = $("#board-temp").html();
	var template = Handlebars.compile(template_script);
	$(".game-board").html(template(array));
	localStorage.setItem("grid", JSON.stringify(array));
	window.location.hash = '#board';

	
}

function createField(question, row, column) {
	question["row"] = row;
	question["column"] = column;
	return question;
}

$(function() {
	$("#submitButton").click(parseInput);
})


function makeBoard() {
	makePath();
	makePlayers();
}


function makePath(){

    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 23; j++) {
            if (i == 0 && j > 6) removeButton(i,j);
            if ((i > 0 && i < 4) && j != 6) removeButton(i,j);
            if (i == 4 && (j < 6 || j > 10)) removeButton(i,j);
            if ((i > 4 && i < 7)  && j != 10) removeButton(i,j);
            if (i == 7 && (j < 10 || j > 16)) removeButton(i,j);
            if ((i > 7 && i < 10)  && j != 16) removeButton(i,j);
            if (i == 10 && (j < 16 || j > 21)) removeButton(i,j);
            if (i > 10 && j < 21 ) removeButton(i,j);
        }
    }
}


function removeButton(row,col){
     $("#"+row+"-"+col).css ({
                            backgroundColor: "transparent",
                            pointerEvents: "none",
                            border: "none"
                        });;

  }

var players = [];

function makePlayers(){

  	 for (var i = 0; i < numberOfPlayers; i++){
  	 		players[i] = new Player(i);
  	 		players[i].addPlayerButton();
  	 }
  }

