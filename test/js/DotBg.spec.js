const assert = require('chai').assert;

import DotBg from '../../src/js/DotBg';


describe('DotBg', function () {
	const dotBg = new DotBg();

	describe('getDistance', function () {
		let result = dotBg.getDistance(0, 3, 4, 0);

		it('getDistance should return number 5', function () {
			assert.isNumber(result);
			assert.equal(result, 5);
		});
	});


	describe('update', function () {
		let result = dotBg.update();
		
		console.log(result);
		

		it('update should return boolean false', function () {
			assert.isBoolean(result);
			assert.isFalse(result);
		});
	});
});
