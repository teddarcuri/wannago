<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import destinationIcon from '$lib/img/destination.svg';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '$lib/stores/activeInfoDisplay';
	import createMarker from '../util/createMarker';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';

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
		activeDestinationStore.update((s) => ({
			marker,
			destination
		}));
	} else {
		domElement.classList.remove('active-destination');
	}

	domElement.addEventListener('click', (e) => {
		goto(`/globe/destinations/${name}`);
	});

	domElement.addEventListener('mouseenter', () => {
		if (isActive) {
			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Information,
				displayText: 'Click to edit'
			}));
		} else {
			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Black,
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

<style global>
	.mapboxgl-marker-wrapper {
		height: 50px;
		width: 50px;
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
		background-image: linear-gradient(var(--angle), #b3c0da, #77869c, #b9cbe5, #99b9e6, #57667e);
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

	/* Marker States/Colors */
	.destination {
		background-image: linear-gradient(var(--angle), #9ba9be, #425369, #6691cd);
	}

	.blue {
		background-image: linear-gradient(var(--angle), #35a4a4, #1271a0, #269584);
	}

	.golden {
		background-image: linear-gradient(var(--angle), #cdbd44, #ece7a1, #c5ae5c, #7a5224);
	}

	.golden2 {
		background-image: linear-gradient(var(--angle), #f8f1be, #c9af77, #d8c684, #ddb990);
	}

	/* Active Destination */
	.active-destination {
		height: 60px;
		width: 60px;
		z-index: 10;
	}

	.active-destination .mapboxgl-marker-inner {
		height: calc(100% - 6px);
		width: calc(100% - 6px);
	}

	.active-destination .mapboxgl-marker-inner img {
		opacity: 0.8;
		width: 24px;
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

	.active-destination .mapboxgl-marker-inner {
		height: calc(100% - 6px);
		width: calc(100% - 6px);
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
