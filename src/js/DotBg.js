import Common from './Common';

//Extending class with Common functions class
//A little banana, gorilla and jungle problem but in acceptable scale
export default class DotBg extends Common {
	constructor(
		context = undefined, 
		x = 0, 
		y = 0, 
		radius = 0, 
		color = '#ffffff', 
		radiusMax = 0, 
		dist = 0
	) {
		//assign class values
		super();
		
		this.context = context;
		this.x = parseFloat(x);
		this.y = parseFloat(y);
		this.radius = parseFloat(radius);
		this.color = color;
		this.radiusMin = parseFloat(radius);
		this.radiusMax = parseFloat(radiusMax);
		this.dist = parseFloat(dist);
	}
	
	//Draw method with color as string value
	draw() {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.context.fillStyle = this.color;
		this.context.fill();
		this.context.closePath();
	}
	
	
	update(arr = []) {
		//Flags for animation
		let grow = false;
		
		//check if DotBg is in a range of any Dot
		for (let i = 0; i < arr.length; i++) {
			if (!grow) {
				const dot = arr[i];
				// this can be replace with detection by x and y for better performance 
				// but result looks like square.
				// for better colision detection nad look I used Pythagorean theorem,
				// in cost of performance
				if (this.getDistance(dot.x, dot.y, this.x, this.y) < this.dist) {
					grow = true;
					break;
				}
			}
		}
		
		//check if DotBg needs to be animated
		if (grow && this.radius < this.radiusMax) {
			this.radius += 1;
		} else if (!grow && this.radius > this.radiusMin) {
			this.radius -= 0.1;
		}
		
		//Javascript is broke this is fixing if on decimal position
		this.radius = parseFloat(parseFloat(this.radius).toFixed(1));
		
		//Return values for animation check
		return this.radius !== this.radiusMin;
	}
}
