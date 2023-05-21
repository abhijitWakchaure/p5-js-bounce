function ball(x, y) {
	this.x = x;
	this.y = y;
	this.r = 20;
	this.velocity = 0;
	this.gravity = 0.6;
	this.lift = -15;

	this.show = function () {
		fill(255, 193, 7);
		noStroke();
		ellipse(this.x, this.y, this.r * 2, this.r * 2)
	}
	this.showHot = function () {
		fill(255, 152, 0);
		noStroke();
		ellipse(this.x, this.y, this.r * 2, this.r * 2)
		fill(255);
	}
	this.update = function () {
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;

		if (this.y + this.r > height) {
			this.y = height - this.r;
			this.velocity = 0;
		}
		if (this.y - this.r < 0) {
			this.y = this.r;
			this.velocity = 0;
		}
	}
	this.reposition = function (x, y) {
		this.x = x;
		this.y = y;
		this.velocity = 0;
	}

	this.bounce = function () {
		this.velocity += this.lift;
	}

	this.bounceTouch = function () {
		this.velocity += this.lift / 2;
	}

	this.minX = function() {
		return this.x - this.r
	}

	this.maxX = function() {
		return this.x + this.r
	}

	this.minY = function() {
		return this.y - this.r
	}

	this.maxY = function() {
		return this.y + this.r
	}
}