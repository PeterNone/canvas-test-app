require('../sass/styles.scss');
//Fix for ie9 and canvas request of requestAnimationFrame
require('./polyfill/requestAnimationFramePolyfill');

import CanvasDots from './CanvasDots';

const canvasDots = new CanvasDots(
	/* default params, uncomment and change */
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
);
