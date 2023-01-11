<script lang="ts">
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import type { Map, Marker } from 'mapbox-gl';
	import { getContext, onDestroy, onMount } from 'svelte';
	import createMarker from '../util/createMarker';

	export let waypoints: Array<object>;
	let markers: Array<Marker> = [];

	const { getMap } = getContext('map');
	const map: Map = getMap();

	onMount(() => {
		waypoints.forEach(waypoint => {
			// return console.log('waypoint', waypoint);
			const {
				coordinates: {
					coordinates: [lat, lng],
				},
				name,
				hex: color,
			} = waypoint;

			const marker = createMarker({
				lat,
				lng,
				name,
				color,
				isWaypoint: true,
				map,
			});

			marker.on('click', () => {
				const center: [number, number] = [lng, lat];
				console.log('CENTER: ', center);
				map.flyTo({
					center,
					zoom: 15,
				});
			});

			marker.addTo(map);
			markers.push(marker);
		});
	});

	onDestroy(() => {
		markers.forEach(marker => marker.remove());
	});
</script>

<style global lang="scss">
	.delete-mode .waypoint-marker {
		display: none;
	}

	.waypoint-marker {
		@apply rounded-xl cursor-pointer;
		box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.3);

		canvas {
			transition: all ease 0.25s;
		}

		&:hover {
			z-index: 999999;
		}

		&:not(.active-destination):hover {
			canvas {
				transform: scale(1.2);
			}

			.name-bubble {
				@apply block;
			}
		}

		// psuedo element that does what the border is doing above
		&::before {
			@apply absolute rounded-xl;
			content: '';
			width: 100%;
			height: 100%;
			border: solid 2px rgba(255, 255, 255, 0.2);
			box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.1) inset;
			pointer-events: none;
		}

		.name-bubble {
			@apply text-sm rounded-full;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
