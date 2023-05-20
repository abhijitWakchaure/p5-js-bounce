var ball;
var minht;
var sticks = [];
var score;
var highscore;
var canvasWidth, canvasHeight
var isGameOver = false;
var gamePaused = false;
var touchCorrection = true;

function setup() {
	// rectMode(CENTER) interprets the first two parameters as the shape's center point, while the third and fourth parameters are its width and height.
	rectMode(CENTER);

	var headerParent = document.getElementById("header")
	var canvasParent = document.getElementById("canvas")
	canvasWidth = windowWidth - (windowWidth - canvasParent.offsetWidth - 2)
	canvasHeight = windowHeight - headerParent.offsetHeight - 15
	var c = createCanvas(canvasWidth, canvasHeight);
	c.parent("canvas");
	ball = new ball(40, height / 2);
	sticks.push(new stick());
	minht = height - 20;
	score = 0;
	highscore = getHighScore().score;
	frameRate(60);
}

function displayScore() {
	textSize(20);
	textAlign(LEFT);
	fill(255);
	text(`${getPlayerName()}: ${score}`, canvasWidth - 150, 25, 300, 50);
	if (score >= highscore) {
		highscore = score;
	}
	if (highscore == 0 || score === highscore) return
	text(`${getHighScore().highScorer}: ${highscore}`, canvasWidth - 150, 50, 300, 50);
}

function draw() {
	background(51);
	//ball.fall(minht);
	displayScore()

	if (gamePaused) {
		console.log("game is paused")
		return
	}

	if (frameCount % 30 == 0) {
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
	if (isGameOver) {
		textSize(40);
		textAlign(CENTER);
		text("Score: " + score, width / 2, height / 2);
		if (score >= highscore) {
			setHighScore(score)
		}
		gameOver();
	}

	if (score % 7 == 0 && score != 0) {
		ball.showHot();
		textSize(40);
		textAlign(CENTER);
		text("FASTER", width / 2, height / 3);
		for (var i = sticks.length -1; i >= 0; i--) {
			sticks[i].faster();
		}
	} else {
		ball.show();
	}
	ball.update();
}

function keyPressed() {
	if (key == ' ') {
		ball.bounce();
		score++;
	}
	if (keyCode == CONTROL) {
		resetGame();
	}
	return false;
}
function touchStarted() {
	if (touchCorrection) {
		ball.bounce();
		score++;
		touchCorrection = false;
	}
	else {
		touchCorrection = true;
	}
}

function gameOver() {
	noLoop();
}
function resetGame() {
	ball.reposition(40, height / 2);
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