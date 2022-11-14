export default function (map) {
	// At low zooms, complete a revolution every two minutes.
	const secondsPerRevolution = 500;
	// Above zoom level 5, do not rotate.
	const maxSpinZoom = 6;
	// Rotate at intermediate speeds between zoom levels 3 and 5.
	const slowSpinZoom = 3;

	let userInteracting = false;
	let spinEnabled = true;
	let zoomTimeout;

	function spinGlobe() {
		const zoom = map.getZoom();
		if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
			let distancePerSecond = 360 / secondsPerRevolution;
			if (zoom > slowSpinZoom) {
				// Slow spinning at higher zooms
				const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
				distancePerSecond *= zoomDif;
			}
			const center = map.getCenter();
			center.lng -= distancePerSecond;
			// Smoothly animate the map over one second.
			// When this animation is complete, it calls a 'moveend' event.
			map.easeTo({ center, duration: 1000, easing: (n) => n });
		}
	}

	// Pause spinning on interaction
	map.on('mousedown', () => {
		userInteracting = true;
	});

	// Restart spinning the globe when interaction is complete
	map.on('mouseup', () => {
		userInteracting = false;
		spinGlobe();
	});

	// User zoom in/out of globe
	map.on('zoomstart', () => {
		userInteracting = true;
		if (zoomTimeout) clearTimeout(zoomTimeout);
	});

	map.on('zoomend', () => {
		zoomTimeout = setTimeout(() => {
			// Wait a bit after user stops zooming to begin spinning again
			userInteracting = false;
			spinGlobe();
		}, 999);
	});

	// These events account for cases where the mouse has moved
	// off the map, so 'mouseup' will not be fired.
	map.on('dragend', () => {
		userInteracting = false;
		spinGlobe();
	});
	map.on('pitchend', () => {
		userInteracting = false;
		spinGlobe();
	});
	map.on('rotateend', () => {
		userInteracting = false;
		spinGlobe();
	});

	// When animation is complete, start spinning if there is no ongoing interaction
	map.on('moveend', () => {
		spinGlobe();
	});

	spinGlobe();

	map.on('contextmenu', () => {
		// TODO: Assign to nice "Start/Stop" button in UI
		spinEnabled = !spinEnabled;
		if (spinEnabled) {
			spinGlobe();
		} else {
			map.stop(); // Immediately end ongoing animation
		}
	});
}
