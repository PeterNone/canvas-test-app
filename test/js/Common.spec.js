const assert = require('chai').assert;

import Common from '../../src/js/Common';


describe('Common', function () {
	const common = new Common();

	describe('getDistance', function () {
		let result = common.getDistance(0, 3, 4, 0);

		it('getDistance should return number 5', function () {
			assert.isNumber(result);
			assert.equal(result, 5);
		});
	});


	describe('randomFromRange', function () {
		let result = common.randomFromRange(10, 20);

		it('randomFromRange should return number between 10 and 20', function () {
			assert.isNumber(result);
			assert.isAtLeast(result, 10);
			assert.isAtMost(result, 20);
		});
	});


	describe('randomArrayElement', function () {
		let result = common.randomArrayElement([1, 2, 3, 4, 5]);

		it('randomArrayElement should return number 1, 2, 3, 4 or 5', function () {
			assert.isAtLeast(result, 1);
			assert.isAtMost(result, 5);
		});
	});
});
