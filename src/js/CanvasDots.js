import Dot from './Dot';
import DotBg from './DotBg';
import Common from './Common';

//Extending class with Common functions class
//A little banana, gorilla and jungle problem but in acceptable scale
export default class CanvasDots extends Common {
	constructor(params = {}) {
		super();
		
		//default params
		//all values can be passed as params object
		//bg value will turn of background dots for extra performance
		//skipFrames Number of frames to skip. - Removing every secound
		// frame dramaticly improoves performance
		//use override setting in index.js
		this.params = {
			gravity: 1,
			frictionX: 0.995,
			frictionY: 0.7,
			dotColors: ['#4facfe', '#43b7fe', '#31c6fe', '#1ed8fe', '#0ce7fe'],
			bg: true,
			bgSpread: 30,
			bgSize: 1,
			bgSizeMax: 20,
			bgDetectDist: 30,
			bgColors: ['#263038', '#253138', '#233238', '#223438', '#203538'],
			skipFrames: 1,
		};
		
		//using spread operator ...params after bgColors will sort out the problem
		//but it's not supported in IE11 with babel (Object.assign())
		//So this loop will extend this.parameters as well in this case
		//and will work in all browsers without extra size for polifill
		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				this.params[key] = params[key];
			}
		}
		
		
		//Initialize some value
		this.animationFrame = 0;
		this.dotsArray = [];
		this.dotsBgArray = [];
		this.skipFramesCounter = this.params.skipFrames;
		this.canvas = document.createElement('canvas');
		
		
		//Browser Canvas Support check
		if (!(!!(this.canvas.getContext && this.canvas.getContext('2d')))) {
			const error = 'Canvas element is not supported in this Browser.';
			console.warn(error);
			const h = document.createElement('h1');
			h.innerHTML = error;
			document.body.appendChild(h);
			return;
		}
		
		//Setting initial canvas size
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		
		//Adding canvas to page body
		document.body.appendChild(this.canvas);
		this.context = this.canvas.getContext('2d');
		
		//initialize functions
		this.addEventListeners();
		if (this.params.bg) {
			this.initBackground();
		}
		this.animate();
	}
	
	//Background dots
	initBackground() {
		//clean up old background dots
		for (let i = 0; i < this.dotsBgArray.length; i++) {
			this.dotsBgArray[i] = undefined;
		}
		
		//create new background dots array
		this.dotsBgArray = [];
		
		const size = this.params.bgSpread;
		let move = 0.25;
		let i = size / 2;
		
		//create and arrange background dots
		while (i < this.canvas.width) {
			let ii = (size / 2) + (size * move);
			while (ii < this.canvas.height) {
				this.dotsBgArray.push(new DotBg(
					this.context,
					i, 
					ii, 
					this.params.bgSize, 
					this.randomArrayElement(this.params.bgColors), 
					this.params.bgSizeMax, 
					this.params.bgDetectDist
				));
				ii += size;
			}
			i += size;
			move = -move;
		}
		
		//show background dots if required without triggering another animation run
		if (!this.animationFrame) {
			this.animate();
		}
	}
	
	
	//Adding new Dot on mouse click
	addDot(x = 0, y = 0) {
		//Randomizing values
		const radius = this.randomFromRange(20, 30);
		
		//Check if click was not too close to edge and adjust position
		//to avoid Dots trapped on the edge of window
		if (x < radius) {
			x = radius;
		} else if (x > this.canvas.width - radius) {
			x = this.canvas.width - radius;
		}
		if (y < radius) {
			y = radius;
		} else if (y > this.canvas.height - radius) {
			y = this.canvas.height - radius;
		}
		
		//Random initial velocity
		const dx = this.randomFromRange(-10, 10);
		const dy = this.randomFromRange(-30, 10);
		
		const colorTemp = this.randomArrayElement(this.params.dotColors).replace('#', '');
		
		//Split color to separate rgb and alpha values for the future animation
		const color = { 
			r: parseInt(colorTemp.substring(0, 2), 16), 
			g: parseInt(colorTemp.substring(2, 4), 16), 
			b: parseInt(colorTemp.substring(4, 6), 16), 
			a: 1 
		};
		
		//returning new Dot with parameters
		return new Dot(
			this.canvas, 
			this.context, 
			x, 
			y, 
			radius, 
			color, 
			dx, 
			dy, 
			this.params.gravity, 
			this.params.frictionX, 
			this.params.frictionY
		);
	}
	
	
	//A method that will handle each frame animation
	
	animate() {
		//request for next animation frame
		this.animationFrame = requestAnimationFrame(this.animate.bind(this));
		
		if (--this.skipFramesCounter > 0) { return; }
		this.skipFramesCounter = this.params.skipFrames;
		//flag for animation
		let isAnimating = false;
		
		//clearing previous animation frame
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		//Requesting update of background if required
		if (this.params.bg) {
			for (let i = 0; i < this.dotsBgArray.length; i++) {
				const updateResult = this.dotsBgArray[i].update(this.dotsArray);
				this.dotsBgArray[i].draw();
				isAnimating = isAnimating || updateResult;
			}
		}
		
		//Requesting update of mouse spawn dots
		//This loop is backward to avoid problems with removed dots 
		//and indexes in the array. With this approach, there is no need 
		//to check again array from beginning if dot was removed.
		for (let i = this.dotsArray.length - 1; i >= 0; i--) {
			//dirty check but there is no need for something more complicated
			//this removes Dots from view and dots array if they finished 
			//their animation and fade out completely
			if (this.dotsArray[i].color.a <= 0) {
				//Remove Dot
				this.dotsArray[i] = undefined;
				this.dotsArray.splice(i, 1);
			} else {
				//Or update Dot
				this.dotsArray[i].update();
				this.dotsArray[i].draw();
			}
		}
		
		//check if we need animate canvas, if not turn off animation request
		//no need to drain resources for this
		if (!this.dotsArray.length && !isAnimating) {
			cancelAnimationFrame(this.animationFrame);
			//reset animation frame, used as a flag in other places
			this.animationFrame = 0;
		}
	}
	
	
	addEventListeners() {
		//Add a listener for a  mouse click to spawn new Dot
		addEventListener('click', event => {
			//create new Dot
			const dot = this.addDot(event.clientX, event.clientY);
			
			//add to dots array
			this.dotsArray.push(dot);
			
			//start animating if it's not animating
			//this.animationFrame used as flag
			if (!this.animationFrame) {
				this.animate();
			}
		});
		
		//Add resize event for mobile change orientation or window resize
		addEventListener('resize', () => {
			//Set new canvas size
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			
			//Reinit Background if required
			if (this.params.bg) {
				this.initBackground();
			}
			
			//this loop checks and reposition dots that can get trapped 
			//outside of new window boundaries
			for (let i = this.dotsArray.length - 1; i >= 0; i--) {
				const dot = this.dotsArray[i];
				if (dot.x + dot.radius > this.canvas.width) {
					dot.x = this.canvas.width - dot.radius;
				}
				if (dot.y + dot.radius > this.canvas.height) {
					dot.y = this.canvas.height - dot.radius;
				}
			}
		});
	}
}
