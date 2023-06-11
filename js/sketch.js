var ball;
var minht;
var sticks = [];
var score;
var highscore;
var canvasWidth, canvasHeight
var ballStarX;
var isGameOver = false;
var gamePaused = false;
var touchCorrection = true;
var bgImage;
var bgPipe, bgPipeInverted;

function preload() {
	bgImage = loadImage('images/background.jpeg')
	bgPipe = loadImage('images/pipe.png')
	bgPipeInverted = loadImage('images/pipeInverted.png')
}

function setup() {
	var headerParent = document.getElementById("header")
	var canvasParent = document.getElementById("canvas")
	canvasWidth = windowWidth - (windowWidth - canvasParent.offsetWidth) + 12
	canvasHeight = windowHeight - headerParent.offsetHeight - 7
	var c = createCanvas(canvasWidth, canvasHeight);
	c.parent("canvas");
	ballStarX = width / 4
	ball = new ball(ballStarX, height / 2);
	sticks.push(new stick());
	minht = height - 20;
	score = 0;
	highscore = getHighScore().score;
	frameRate(120);
}

function draw() {
	background(bgImage);
	if (gamePaused) {
		console.log("game is paused")
		return
	}

	if (frameCount % 100 == 0) {
		sticks.push(new stick());
	}
	for (var i = sticks.length - 1; i >= 0; i--) {
		if (sticks[i].hits(ball)) {
			isGameOver = true;
			sticks[i].showRed();
			break
		}
		sticks[i].show();
		sticks[i].update();
		if (sticks[i].offScreen()) {
			sticks.splice(i, 1);
		}
	}
	if (ball.edged()) {
		isGameOver = true;
	}
	if (isGameOver) {
		if (score >= highscore) {
			setHighScore(score)
		}
		gameOver();
	}

	if (score % 7 == 0 && score != 0) {
		ball.showHot();
		textSize(40);
		textAlign(CENTER);
		text("Faster", width / 2, height / 3);
		for (var i = sticks.length - 1; i >= 0; i--) {
			sticks[i].faster();
		}
	} else {
		ball.show();
	}

	if (score % 15 == 0 && score != 0) {
		for (var i = sticks.length - 1; i >= 0; i--) {
			sticks[i].normalSpeed();
		}
	}
	ball.update();
	displayScore()
}

function displayScore() {
	// Draw white rectangle
	fill(255);
	textSize(20)
	rect(canvasWidth - 310, 10, 300, 110);

	textSize(20);
	textAlign(LEFT, TOP);
	fill(0);
	textStyle(BOLD);
	text(`Score:`, canvasWidth - 300, 25, 300, 50);
	textStyle(NORMAL);
	text(`${getPlayerName()}: ${score}`, canvasWidth - 300, 45, 300, 50);
	if (score >= highscore) {
		highscore = score;
	}
	if (highscore == 0 || score === highscore) return
	textStyle(BOLD);
	text(`High Score:`, canvasWidth - 300, 75, 300, 50);
	textStyle(NORMAL);
	text(`${getHighScore().highScorer}: ${highscore}`, canvasWidth - 300, 95, 300, 50);
	// Reset colors
	fill(255);
}

function keyPressed() {
	if (key == ' ') {
		ball.bounce();
		score++;
	}
	if (keyCode == CONTROL || key == 'r') {
		resetGame();
	}
	return false;
}
function touchStarted() {
	if (touchCorrection) {
		ball.bounce();
		score++;
		touchCorrection = false;
	} else {
		touchCorrection = true;
	}
}

function gameOver() {
	var rectWidth = 500;
	var rectHeight = 200;
	var rectY = height / 2 - rectHeight / 2;
	var rectX = width / 2 - rectWidth / 2;
	var rectBorderRadius = 20;

	// Draw rectangle with black border
	fill(255);
	// outer rect
	rect(rectX, rectY, rectWidth, rectHeight, rectBorderRadius, rectBorderRadius, rectBorderRadius, rectBorderRadius);
	stroke(0)
	// inner rect
	rect(rectX + 10, rectY + 10, rectWidth - 20, rectHeight - 20, rectBorderRadius, rectBorderRadius, rectBorderRadius, rectBorderRadius);
	noStroke()

	// Draw "Game Over" text in big font
	fill(0);
	textSize(48);
	textAlign(CENTER, CENTER);
	text("Game Over", width / 2, rectY + 45);

	// Draw "Your score is: --" text in smaller font
	textSize(24);
	text(`Your score is: ${score}`, width / 2, rectY + (rectHeight / 2));

	tip = "Try not to touch the edges or pipes"
	textStyle(ITALIC);
	text(tip, width / 2, rectY + rectHeight - 30);
	textStyle(NORMAL);

	// Reset textAlign
	textAlign(LEFT, TOP)
	noLoop();
}
function resetGame() {
	ball.reposition(ballStarX, height / 2);
	score = 0;
	sticks = [];
	isGameOver = false;
	loop();
}

function setHighScore(score) {
	localStorage.setItem("drl.p5-bounce.highScore", score);
	localStorage.setItem("drl.p5-bounce.highScorer", getPlayerName());
}

function getHighScore() {
	var highScore = localStorage.getItem("drl.p5-bounce.highScore");
	var highScorer = localStorage.getItem("drl.p5-bounce.highScorer");
	if (highScore == null) highScore = 0
	if (highScorer == null) highScorer = "Guest"
	return {
		score: highScore,
		highScorer: highScorer
	}
}

function pauseGame() {
	if (isGameOver) return
	gamePaused = true
}

function resumeGame() {
	if (isGameOver) return
	gamePaused = false
	if (!isLooping()) {
		loop()
	}
}

function getPlayerName() {
	var playerName = localStorage.getItem("drl.p5-bounce.playerName");
	if (playerName == null || playerName.length == 0) return "Guest"
	return playerName
}

function registerPlayerName() {
	var playerName = document.getElementById('playerNameInput').value
	if (playerName) {
		localStorage.setItem("drl.p5-bounce.playerName", playerName);
	}
	newGameModal.hide()
	resumeGame()
}

const newGameModalEl = document.getElementById('newGameModal')
const instructionsModalEl = document.getElementById('instructionsModal')
var newGameModal = new bootstrap.Modal(newGameModalEl, {});

newGameModalEl.addEventListener('show.bs.modal', event => {
	console.log("new game modal show");
	pauseGame()
})

instructionsModalEl.addEventListener('show.bs.modal', event => {
	console.log("instructions modal show");
	pauseGame()
})

newGameModalEl.addEventListener('hide.bs.modal', event => {
	console.log("new game modal hide");
	resumeGame()
})

instructionsModalEl.addEventListener('hide.bs.modal', event => {
	console.log("instructions modal hide");
	resumeGame()
})

// window.addEventListener('load', function () {
// 	if (getPlayerName() === "Guest")
// 		newGameModal.show(newGameModalEl)
// })

if (typeof console != "undefined")
	if (typeof console.log != 'undefined')
		console.olog = console.log;
	else
		console.olog = function () { };

console.log = function (message) {
	console.olog(message);
	document.getElementById('debugDiv').append('<p>' + message + '</p>');
};
console.error = console.debug = console.info = console.log