<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import destinationIcon from '$lib/img/destination.svg';
	import destinationIconMo from '$lib/img/destination-mo.svg';

	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '$lib/stores/activeInfoDisplay';
	import createMarker from '../util/createMarker';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import rotateCameraAroundPoint from '../util/rotateCameraAroundPoint';

	export let map: Map;
	export let destination: object;

	const { name, coordinates } = destination;

	const {
		coordinates: [lng, lat]
	} = coordinates;

	const marker = createMarker({ name, map, lat, lng, icon: destinationIcon });
	const domElement = marker.getElement();
	const img = getMarkerImgChildNode(domElement);
	img.src = destinationIcon;

	$: routeId = $page.routeId;
	$: slug = $page.params.slug;
	$: isActive = slug === name;
	$: if (isActive) {
		domElement.classList.add('active-destination');
		map.flyTo({
			zoom: map.getZoom() < 10 ? 14 : map.getZoom() + 0.25,
			center: coordinates.coordinates,
			pitch: 69,
			speed: 1
		});
	} else {
		domElement.classList.remove('active-destination');
	}

	domElement.addEventListener('click', (e) => {
		goto(`/globe/destinations/${name}`);
	});

	// TODO: ROTATE AROUND MARKER
	// let rotateCameraAnimationFrame;
	// domElement.addEventListener('dblclick', (e) => {
	// 	e.stopPropagation();
	// 	rotateCameraAnimationFrame = rotateCameraAroundPoint({ point: [lng, lat], init: 0, map });
	// });

	// $: map.on('click', () => {
	// 	map.stop();
	// 	cancelAnimationFrame(rotateCameraAnimationFrame);
	// });

	// TODO: COnsider a refactor
	// It might be good to simply have this apply/remove a class
	domElement.addEventListener('mouseenter', () => {
		if (isActive) {
			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Information,
				displayText: 'Click to edit'
			}));
		} else {
			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Information,
				displayText: name
			}));
		}
	});

	domElement.addEventListener('mouseleave', () => {
		activeInfoDisplayStore.update((s) => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: ''
		}));
	});
</script>
