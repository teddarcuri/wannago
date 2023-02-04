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
	import { onDestroy, onMount } from 'svelte';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import { userDestinationsStore } from '@/lib/stores/userDestinations';

	export let map: Map;
	export let destination: object;

	const coordinates = destination?.coordinates?.coordinates;
	const id = destination?.id;
	const name = destination?.name;
	const lat = coordinates?.[1];
	const lng = coordinates?.[0];
	const icon = $userDestinationsStore.destinationTypes?.find(
		type => type.id === destination?.type_id,
	)?.icon;

	// Create mapbox Marker instance
	const marker = createMarker({
		name,
		map,
		lat,
		lng,
		icon,
	});

	// Marker DOM element
	const domElement: HTMLElement = marker.getElement();
	const img: HTMLImageElement = getMarkerImgChildNode(domElement);

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
		// domElement.classList.add('golden2');

		// map.flyTo({
		// 	zoom: map.getZoom() < 10 ? map.getZoom() + 1 : map.getZoom(),
		// 	center,
		// 	// pitch: 69,
		// 	duration: 2000,
		// });

		// Edit location mode
		if ($activeDestinationStore.editLocationMode) {
			domElement.classList.add('blue');
			marker.setDraggable(true);
			// img.src = moveIcon;
		} else {
			marker.setDraggable(false);
			// img.src = mountainIcon;
			domElement.classList.remove('blue');
		}
		// Delete Mode
		if ($activeDestinationStore.deleteMode) {
			domElement.classList.add('red');
		} else {
			domElement.classList.remove('red');
		}
	} else {
		marker.setDraggable(false);
		// console.log(
		// 	'ELSE - this is run for every marker, every time the route changes. It would behoove us to address this.',
		// );
		domElement.classList.remove('active-destination');

		// // if there is an active destination, hide all other markers
		// if ($activeDestinationStore.destination) {
		// 	domElement.classList.add('hidden');
		// } else {
		// 	domElement.classList.remove('hidden');
		// }
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

	// if the marker is active, when the dom element is double clicked it should enable editLocation mode
	// idk, still feeling this out.
	domElement.addEventListener('dblclick', e => {
		if (isActive) {
			activeDestinationStore.update(s => ({
				...s,
				editLocationMode: true,
			}));

			activeInfoDisplayStore.update(s => ({
				status: ActiveInfoDisplayStatus.Action,
				displayText: 'Drag marker to new location',
			}));
		}
	});

	const bail = () => {
		if ($activeDestinationStore.editLocationMode) return true;
		if ($addWaypointStore.active) return true;
		return false;
	};

	domElement.addEventListener('mouseenter', () => {
		if (bail()) return;
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
		if (bail()) return;
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: '',
		}));
	});

	// Lifecycle
	onMount(() => {
		// console.log(
		// 	`--------------------- MOUNTED ${destination.name} ---------------------`,
		// );
		// console.log(
		// 	`** We need to prevent each marker from rerendering on update. Bring data prop into the individual marker ----`,
		// );
	});
	onDestroy(() => {
		marker.remove();
	});
</script>

<style global lang="scss">
	.delete-mode {
		.mapboxgl-marker-wrapper:not(.active-destination) {
			display: none;
		}
	}

	.mapboxgl-marker-wrapper {
		height: 40px;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: height ease-in-out 0.1s, width ease-in-out 0.15s;
		z-index: 1;

		&.add-destination {
			height: 52px;
			width: 52px;
		}

		&.hidden {
			display: none;
		}

		&:not(.active-destination):hover {
			.name-bubble {
				@apply block;
			}
		}
	}

	.name-bubble {
		@apply absolute -top-[50px] 
		whitespace-nowrap bg-black 
		hidden text-lg
		py-2 p-4 rounded-lg;
		box-shadow: 0 0 10px 7px rgba(0, 0, 0, 0.333);
	}

	.mapboxgl-marker-wrapper:not(.add-destination):not(.active-destination):hover {
		cursor: pointer;
		z-index: 2;
		height: 62px;
		width: 62px;
	}

	.mapboxgl-marker-wrapper:not(.active-destination):not(.add-destination):hover
		.mapboxgl-marker-inner,
	.add-destination .mapboxgl-marker-inner {
		height: calc(100% - 7px);
		width: calc(100% - 7px);
	}

	.mapboxgl-marker-wrapper:not(.active-destination):not(.add-destination):hover
		.mapboxgl-marker-inner {
		background-image: linear-gradient(0deg, rgb(24, 24, 24), rgb(43, 43, 43));
	}

	.mapboxgl-marker-wrapper:not(.active-destination):hover .mapboxgl-marker-background,
	.add-destination .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #d4dced, #bcc7d6e5, #99b9e6, #98adce);
		opacity: 0.7;
	}

	.mapboxgl-marker-wrapper:hover img {
		opacity: 1 !important;
		width: 28px;
	}

	.add-destination img {
		opacity: 0.9 !important;
		width: 18px !important;
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
		background-image: linear-gradient(var(--angle), #d4dced, #bcc7d6e5, #99b9e6, #98adce);
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
		height: calc(100% - 7px);
		width: calc(100% - 7px);
	}

	.active-destination .mapboxgl-marker-inner img {
		opacity: 0.9 !important;
		width: 33px;
	}

	.active-destination .mapboxgl-marker-background {
		background-image: linear-gradient(
			var(--angle),
			rgb(101, 197, 133),
			#589184,
			#44a9c3,
			rgb(102, 175, 102),
			rgb(62, 127, 187)
		);
		opacity: 1;
	}

	/* Marker States/Colors */
	.destination {
		opacity: 0.88;
		background-image: linear-gradient(var(--angle), #ffffff, #d3d3d3);
	}

	.mapboxgl-marker.blue .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #35a4a4, #1271a0, #269584);
	}

	.mapboxgl-marker.golden .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #cdbd44, #ece7a1, #c5ae5c, #7a5224);
	}

	.mapboxgl-marker.dark .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #171717, #000000, #2a2a29, #131313);
	}

	.mapboxgl-marker.golden2 .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #f8f1be, #c9af77, #d8c684, #ddb990);
	}

	.mapboxgl-marker.red .mapboxgl-marker-background {
		background-image: linear-gradient(var(--angle), #a43535, #d53728, #ea6d6d);
	}

	/* Inner Marker - dark bg + img */
	.mapboxgl-marker-inner {
		background-image: linear-gradient(0deg, rgb(47, 47, 47), #000);
		border-radius: 50%;
		height: calc(100% - 5px);
		width: calc(100% - 5px);
		z-index: 4;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mapboxgl-marker-inner img {
		width: 19px;
		opacity: 0.88;
	}

	.mapboxgl-marker.loading img {
		width: 40px;
		opacity: 0.7;
		transform: rotate(var(--angle));
		animation: 1.69s rotate cubic-bezier(0.84, 0.16, 0.39, 1.2) infinite;
	}

	.mapboxgl-marker {
		&:hover {
			z-index: 999999 !important;
		}
	}
</style>
