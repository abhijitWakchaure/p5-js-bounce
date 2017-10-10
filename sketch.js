var ball;
var minht;
var sticks = [];
var score;
var isGameOver;
var highscore;
var touchCorrection = true;
function setup(){
	createCanvas(windowWidth-10,400);
	ball = new ball(40,height/2);
	sticks.push(new stick());
	minht = height-20;
	score = 0;
	highscore = 0;
	isGameOver = false;
	frameRate(50);
}

function draw(){
	background(51);
	//ball.fall(minht);
	
	if(frameCount % 50 == 0){
		sticks.push(new stick());
	}
	if(isGameOver){
		textSize(40);
		textAlign(CENTER);
		text("Score: "+score, width/2, height/2);
		gameOver();
	}
	else{
		textSize(20);
		textAlign(LEFT);
		fill(255);
		text("Score: "+score, 10, 25);
		if(score >= highscore){
			highscore = score;
		}
		text("High Score: "+highscore, 10, 50);
		for (var i = sticks.length - 1; i >= 0; i--) {
			sticks[i].show();
			sticks[i].update();
			
			if(sticks[i].hits(ball)){
				isGameOver = true;
			}

			if(sticks[i].offScreen()){
				sticks.splice(i,1);
			}
		}
	}
	if(score%10 == 0 && score != 0){
		ball.showHot();
		ball.update();
		fill(255);
		textSize(40);
		textAlign(CENTER);
		text("FASTER", width/2, height/3);
		for (var i = sticks.length - 1; i >= 0; i--) {
			sticks[i].faster();
		}
	}
	else{
		ball.show();
		ball.update();
	}
}

function keyPressed(){
	if(key == ' '){
		ball.bounce();
		score++;
	}
	if(keyCode == CONTROL){
		resetGame();
	}
	return false;
}
function touchStarted() {
	if(touchCorrection){
		ball.bounce();
		score++	;
		touchCorrection = false;
	}
	else{
		touchCorrection = true;
	}
}

function gameOver(){
	noLoop();
}
function resetGame(){
	ball.reposition(40,height/2);
	score = 0;
	sticks = [];
	isGameOver = false;
	loop();
}