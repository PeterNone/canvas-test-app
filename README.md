# Info

## Click anywhere to spawn new Dot.

[Live demo](http://pkaczmarski.com/canvas/)

	http://pkaczmarski.com/canvas/


Small project that I did lately to play arround with HTML5 canvas and JavaScript.

For packaging and development, minification and automation, I used Webpack 4.

I also added Babel so I can use ES6 features.

For CSS I used SASS, but it was not needed for this amount of CSS.

To make sure to address all browsers that support HTML5 Canvas element, I added
manually requestAnimationFramePolyfill to add full support in IE9.

For Tests I used Mocha and Chai.


# Environment Setup

## Install global packages

> Install [Node](https://nodejs.org/en/download/)


Install local packages

	npm install

---

## Start Development

Run Local Server

	npm start

Run Test

	npm test

Run Build

	npm run build

---

## How to use ?

Run the app using NodeJS by typing:

	npm start

In directory

>src/js

edit file

> index.js

Inside the file, new CanvasDots class is created with commented out default parameters

	{
		// gravity: 1,
		// frictionX: 0.995,
		// frictionY: 0.7,
		// dotColors: ['#4facfe', '#43b7fe', '#31c6fe', '#1ed8fe', '#0ce7fe'],
		// bg: false,
		// bgSpread: 30,
		// bgSize: 1,
		// bgSizeMax: 20,
		// bgDetectDist: 30,
		// bgColors: ['#263038', '#253138', '#233238', '#223438', '#203538'],
		// skipFrames: 1,
	}

By uncommenting any line, changing the value and saving the file, the changes can be seen in browser opened by running node command.
