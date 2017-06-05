var noRows = 12;
var noColumns = 23;
var numberOfPlayers;
var classNumber;
var unityNumber;
var players = [];


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
			makePath();
			makePlayers();
			addCube()
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
	numberOfPlayers = localStorage["numberOfPlayers"];
	classNumber = localStorage["classNumber"];
	unityNumber = localStorage["unityNumber"];
	var rows = noRows;
	var cols = noColumns;

	var quest = shuffle(questions["1"]);

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



function makePath(){

    for (var i = 1; i < noRows-1; i++) {
        for (var j = 1; j < noColumns-1; j++) {
           removeButton(i,j);
    
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

function makePlayers(){

	console.log(numberOfPlayers);

  	 for (var i = 0; i < numberOfPlayers; i++){
  	 		players[i] = new Player(i);
  	 		players[i].addPlayerButton(i);
  	 }
  }

function addCube(){
	var cubeButton = document.createElement('button');

	cubeButton.setAttribute("id", "cubeButton");
	cubeButton.innerHTML = "1";

	cubeButton.setAttribute('onclick','setNewPosition();'); // for FF
    cubeButton.onclick = function() {setNewPosition();};

  	var foo = document.getElementById("cube");  
 	foo.appendChild(cubeButton);
}

