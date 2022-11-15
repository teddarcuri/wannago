// interface Options {
// 	point: Array,
// 	init: ,
// }

export default function ({ point, init, map }) {
	let animationFrame;
	function rotateCamera(timestamp) {
		// clamp the rotation between 0 -360 degrees
		// Divide timestamp by 100 to slow rotation to ~10 degrees / sec
		map.rotateTo((timestamp / 100) % 360, { duration: 2390 });
		// Request the next frame of the animation.
		animationFrame = requestAnimationFrame(rotateCamera);
	}

	rotateCamera(init);

	return animationFrame;
}
