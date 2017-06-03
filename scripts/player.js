
function Player(number) {
	this.number = number;
	this.positionRow = 0;
	this.positionColumn = 0;
	this.score = 0;
	this.color = setColor(this.number);
}

Player.prototype.setPositionRow = function(row) {
	this.positionRow = row;
};

Player.prototype.setPositionColumn = function(column) {
	this.positionColumn = column;
};

Player.prototype.getScore = function() {
	return this.score;
};

Player.prototype.setScore = function(points) {
	this.score += points;
};


Player.prototype.addPlayerButton = function() {
	var playerButton = document.createElement("button");
	playerButton.type = "button";
	playerButton.setAttribute("background-color", this.color);

  	var foo = document.getElementById("blueTeamId");  
 	foo.appendChild(playerButton);
};

function setColor(number) {
	var color ='#'+(Math.random()*0xFFFFFF<<0).toString(16);
	//document.getElementById("player"+number").color = color;
	return color;
};

