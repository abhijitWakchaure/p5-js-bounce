function stick() {
	this.h = constrain(random(height / 2 - 20), height / 8, height / 2 - 20);
	this.x = width;
	this.w = 20;
	this.speed = 4;

	this.show = function () {
		rect(this.x, this.h / 2, this.w, this.h);
		rect(this.x, height - (this.h / 2), this.w, this.h);
	}
	this.showRed = function () {
		fill('red');
		rect(this.x, this.h / 2, this.w, this.h);
		rect(this.x, height - (this.h / 2), this.w, this.h);
		fill(255);
	}
	this.faster = function () {
		this.speed = this.speed + 0.2;
	}
	this.update = function () {
		this.x -= this.speed;
	}
	this.offScreen = function () {
		return (this.x <= -this.w)
	}
	this.hits = function (ball) {
		if ((ball.y - ball.r) < this.h || (ball.y + ball.r) > height - this.h) {
			if (ball.x + ball.r > this.x && ball.x - ball.r < this.x + this.w) {
				let c = color(255, 0, 0);
				fill(c);
				noStroke();
				return true;
			}
		}
		return false;
	}
}