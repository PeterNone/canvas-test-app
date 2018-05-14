const assert = require('chai').assert;

import Dot from '../../src/js/Dot';


describe('Dot', function () {
	const canvas = {
		width: 800,
		height: 600
	}

	const dot = new Dot(canvas);

	describe('update', function () {
		let result = dot.update();

		it('update should return object', function () {
			assert.isObject(result);
			assert.hasAllKeys(result, ['x', 'y', 'radius', 'color']);
			assert.isNumber(result.x);
			assert.isNumber(result.y);
			assert.isNumber(result.radius);
			assert.isObject(result.color);
		});

	});
});
