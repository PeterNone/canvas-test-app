export default class Common {
	//Helper methods

	//Return value from given range
	randomFromRange(min = 0, max = 0) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	//Return random array element
	randomArrayElement(arr = []) {
		return arr[Math.floor(Math.random() * arr.length)];
	}
	
	//Pythagorean theorem
	//Colision detection for circle objects
	getDistance(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
		const xDist = x2 - x1;
		const yDist = y2 - y1;

		return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
	}
}