export default class Dot {
	//assign class values
	constructor(
		canvas = undefined, 
		context = undefined, 
		x = 0, 
		y = 0, 
		radius = 0, 
		color = { r: 0, g: 0, b: 0, a: 1 }, 
		dx = 0, 
		dy = 0, 
		gravity = 0, 
		frictionX = 0, 
		frictionY = 0
	) {
		this.canvas = canvas;
		this.context = context;
		this.x = parseFloat(x);
		this.y = parseFloat(y);
		this.radius = parseFloat(radius);
		this.color = color;
		this.dx = parseFloat(dx);
		this.dy = parseFloat(dy);
		this.gravity = parseFloat(gravity);
		this.frictionX = parseFloat(frictionX);
		this.frictionY = parseFloat(frictionY);
	}
	
	//Draw method with color object and alpha
	//Dublicate from Dot class but small impact 
	//and extra performace lost on checking color if done in one method
	draw() {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.context.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`;
		this.context.fill();
		this.context.closePath();
	}
	
	
	//Update method to calculate all changes
	update() {
		const yy = this.y + this.dy;
		
		//Check if Dot is touching the ground
		if (yy + this.radius > this.canvas.height || yy - this.radius < 0) {
			//Changing Y velocity if bounced of the ground and taking some energi to the friction
			this.dy = -this.dy * this.frictionY;

			//Check to stop bouncing if velocity is verry small, otherwise we have not nice wiggle efect
			if (Math.abs(this.dy * this.frictionY) < this.frictionY + 0.1) {
				this.dy = 0;
			}
			
			//slow down dot rolling when on the ground
			this.dx = this.dx * this.frictionX;
			
			//Check to stop rolling if velocity is verry small
			if (Math.abs(this.dx) < 0.05) {
				this.dx = 0;
			}
			
			//Fade out Dot when it stops moving
			if (!this.dx && !this.dy) {
				this.color.a -= 0.02;
			}
		} else {
			//Else keep adding gravity to velocity
			this.dy += this.gravity;
		}
		
		//Check if Dat is bouncing of the sides
		const xx = this.x + this.dx;
		if (xx + this.radius > this.canvas.width || xx - this.radius < 0) {
			this.dx = -this.dx;
		}
		
		//Add calculated velocity values to position to create ilusion of animation
		this.x += this.dx;
		this.y += this.dy;
		
		//Return values for tests
		return {
			x: this.x,
			y:	this.y,
			radius:	this.radius,
			color: this.color,
		};
	}
}
