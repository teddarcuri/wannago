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
	console.log(animationFrame);

	// map.flyTo({
	// 	center: point,
	// 	zoom: 13,
	// 	speed: 1,
	// 	curve: 1
	// 	// essential: true // this animation is considered essential with respect to prefers-reduced-motion
	// });
	rotateCamera(init);
}
