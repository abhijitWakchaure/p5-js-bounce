function stick() {
	this.ballSpace = random(ball.r * 10, ball.r * 20)
	this.hTop = random(height * 0.20, height * 0.70);
	this.hBottom = height - (this.hTop + this.ballSpace)
	this.x = width;
	this.w = 30;
	this.speed = 4;

	this.show = function () {
		rect(this.x, this.hTop / 2, this.w, this.hTop);
		rect(this.x, height - (this.hBottom / 2), this.w, this.hBottom);
	}
	this.showRed = function () {
		fill('red');
		this.show()
		fill(255);
	}
	this.faster = function () {
		this.speed = 8;
	}

	this.normalSpeed = function () {
		this.speed = 4
	}

	this.update = function () {
		this.x -= this.speed;
	}
	this.offScreen = function () {
		return (this.x <= -this.w)
	}
	this.hits = function (ball) {
		// fast check if ball already passed the stick
		if (ball.minX() > this.x + this.w / 2) {
			return false
		}
		// fast check if ball is far away from stick
		if (ball.maxX() < this.x - this.w / 2) {
			return false
		}
		// check if ball is hitting top stick
		if (ball.minY() <= this.hTop) {
			let c = color(255, 0, 0);
			fill(c);
			noStroke();
			return true;
		}
		// check if ball is hitting bottom stick
		if (ball.maxY() >= height - this.hBottom) {
			let c = color(255, 0, 0);
			fill(c);
			noStroke();
			return true;
		}
		// if ((ball.y - ball.r) < this.hTop || (ball.y + ball.r) > height - this.hBottom) {
		// 	if (ball.x + ball.r > this.x && ball.x - ball.r < this.x + this.w) {
		// 		let c = color(255, 0, 0);
		// 		fill(c);
		// 		noStroke();
		// 		return true;
		// 	}
		// }
		return false;
	}
}