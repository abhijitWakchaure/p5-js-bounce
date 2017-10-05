function stick(){
	this.top = constrain(random(height/2-20),height/8,height/2-20);
	this.bottom = random(height/2);
	this.x = width;
	this.w = 20;
	this.speed = 4;
	this.lit = false;

	this.show = function(){
		if(this.lit){
			fill(255, 0, 0);
		}
		else{
			fill(255);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}
	this.faster = function(){
		this.speed = this.speed + 0.2;
	}
	this.update = function(){
		this.x -= this.speed;
	}
	this.offScreen = function(){
		if(this.x <= -this.w){
			return true;
		}
		else{
			return false;
		}
	}
	this.hits = function(ball){
		if(ball.y < this.top || ball.y > height - this.bottom){
			if(ball.x > this.x && ball.x < this.x + this.w){
				this.lit = true;
				return true;
			}
		}
		this.lit = false;
		return false;
	}
}