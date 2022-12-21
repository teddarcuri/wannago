<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import destinationIcon from '$lib/img/destination.svg';
	import mountainIcon from '$lib/img/mountain.svg';
	import moveIcon from '$lib/img/move.svg';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '$lib/stores/activeInfoDisplay';
	import createMarker from '../util/createMarker';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import { onDestroy } from 'svelte';

	export let map: Map;
	export let destination: object;

	const coordinates = destination?.coordinates?.coordinates;
	const id = destination?.id;
	const name = destination?.name;
	const lat = coordinates?.[1];
	const lng = coordinates?.[0];

	// Create mapbox Marker instance
	const marker = createMarker({
		name,
		map,
		lat,
		lng,
		icon: mountainIcon,
	});

	// Marker DOM element
	const domElement: HTMLElement = marker.getElement();
	const img: HTMLImageElement = getMarkerImgChildNode(domElement);
	img.src = mountainIcon;

	// When user is editing the destination location
	// we update the newCenter variable to determine
	// where we should focus the camera on state change
	let newCenter: [number, number] | undefined;
	$: if ($activeDestinationStore.newLocation) {
		newCenter = [
			$activeDestinationStore.newLocation.lng,
			$activeDestinationStore.newLocation.lat,
		];
	} else {
		newCenter = undefined;
	}

	// This Marker is the active destination
	$: isActive = $page.params.id == id;
	$: center = newCenter || coordinates;

	$: if (isActive) {
		activeDestinationStore.update(s => ({
			...s,
			marker,
			destination,
		}));
		domElement.classList.add('active-destination');
		map.flyTo({
			zoom: map.getZoom() < 10 ? 14 : map.getZoom(),
			center,
			pitch: 69,
			speed: 1,
		});

		// Edit location mode
		if ($activeDestinationStore.editLocationMode) {
			domElement.classList.add('blue');
			marker.setDraggable(true);
			img.src = moveIcon;
		} else {
			marker.setDraggable(false);
			img.src = mountainIcon;
			domElement.classList.remove('blue');
		}
	} else {
		marker.setDraggable(false);
		console.log(
			'ELSE - this is run for every marker, every time the route changes. It would behoove us to address this.',
		);
		domElement.classList.remove('active-destination');
	}

	// Marker Events
	marker.on('dragend', () => {
		const newLocation = marker.getLngLat();
		newCenter = [newLocation.lng, newLocation.lat];
		activeDestinationStore.update(s => ({
			...s,
			newLocation,
		}));
	});

	// DOM Events
	domElement.addEventListener('click', e => {
		if ($activeDestinationStore.editLocationMode) return;
		goto(`/globe/destinations/${id}`);
	});

	domElement.addEventListener('mouseenter', () => {
		if ($activeDestinationStore.editLocationMode) return;
		if (isActive) {
			// activeInfoDisplayStore.update(s => ({
			// 	status: ActiveInfoDisplayStatus.Information,
			// 	displayText: 'Click to edit',
			// }));
		} else {
			activeInfoDisplayStore.update(s => ({
				status: ActiveInfoDisplayStatus.Black,
				displayText: name,
			}));
		}
	});

	domElement.addEventListener('mouseleave', () => {
		if ($activeDestinationStore.editLocationMode) return;
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: '',
		}));
	});

	onDestroy(() => {
		marker.remove();
	});
</script>

<style global>
	.mapboxgl-marker-wrapper {
		height: 45px;
		width: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: height ease-in-out 0.1s, width ease-in-out 0.15s;
		z-index: 1;
	}

	.mapboxgl-marker-wrapper:not(.active-destination):hover {
		cursor: pointer;
		z-index: 2;
		height: 55px;
		width: 55px;
	}

	.mapboxgl-marker-wrapper:not(.active-destination):not(.add-destination):hover
		.mapboxgl-marker-inner,
	.add-destination .mapboxgl-marker-inner {
		height: calc(100% - 5px);
		width: calc(100% - 5px);
	}

	.mapboxgl-marker-wrapper:not(.active-destination):not(.add-destination):hover
		.mapboxgl-marker-inner {
		background-image: linear-gradient(0deg, rgb(24, 24, 24), rgb(43, 43, 43));
	}

	.mapboxgl-marker-wrapper:not(.active-destination):hover .mapboxgl-marker-background,
	.add-destination .mapboxgl-marker-background {
		background-image: linear-gradient(
			var(--angle),
			#b3c0da,
			#77869c,
			#b9cbe5,
			#99b9e6,
			#57667e
		);
	}

	.mapboxgl-marker-wrapper:hover img,
	.add-destination img {
		opacity: 0.8 !important;
	}

	.add-destination:hover {
		cursor: move !important;
	}

	.mapboxgl-marker-background {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 100%;
		background-image: linear-gradient(var(--angle), #75849b, #6c7a8d, #57667e);
		box-shadow: 0px 2px 9px 1px rgba(0, 0, 0, 0.5);
		animation: 5.555s rotate cubic-bezier(0.84, 0.16, 0.39, 1.2) infinite;
	}

	/* Active Destination */
	.active-destination {
		height: 70px;
		width: 70px;
		z-index: 10;
	}

	.active-destination .mapboxgl-marker-inner {
		height: calc(100% - 8px);
		width: calc(100% - 8px);
	}

	.active-destination .mapboxgl-marker-inner img {
		opacity: 0.8;
		width: 29px;
	}

	.active-destination .mapboxgl-marker-background {
		background-image: linear-gradient(
			var(--angle),
			rgb(101, 197, 133),
			#307f6e,
			#6fdbf6,
			rgb(102, 175, 102),
			rgb(62, 127, 187)
		);

		/* background-image: linear-gradient(var(--angle), #fe77a6, #b3156f, #d41b5b, #9e0d38); */
		/* background-image: linear-gradient(var(--angle), #cdbd44, #ece7a1, #c5ae5c, #7a5224); */
	}

	/* Marker States/Colors */
	.destination {
		background-image: linear-gradient(var(--angle), #9ba9be, #425369, #6691cd);
	}

	.blue .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #35a4a4, #1271a0, #269584);
	}

	.golden .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #cdbd44, #ece7a1, #c5ae5c, #7a5224);
	}

	.golden2 .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #f8f1be, #c9af77, #d8c684, #ddb990);
	}

	/* Inner Marker - dark bg + img */
	.mapboxgl-marker-inner {
		background-image: linear-gradient(0deg, rgb(47, 47, 47), #000);
		border-radius: 50%;
		height: calc(100% - 4px);
		width: calc(100% - 4px);
		z-index: 4;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mapboxgl-marker-inner img {
		width: 17px;
		opacity: 0.4;
		transition: height ease-in-out 0.2s, width ease-in-out 0.25s;
	}

	.mapboxgl-marker.loading img {
		width: 28px;
		opacity: 0.7;
		transform: rotate(var(--angle));
		animation: 1.69s rotate cubic-bezier(0.84, 0.16, 0.39, 1.2) infinite;
	}
</style>
