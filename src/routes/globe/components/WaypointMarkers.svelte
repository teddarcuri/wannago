<script lang="ts">
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import type { Map, Marker } from 'mapbox-gl';
	import { getContext, onDestroy, onMount } from 'svelte';
	import createMarker from '../util/createMarker';

	export let waypoints: Array<object>;
	let markers: Array<Marker> = [];

	const { getMap } = getContext('map');
	const map: Map = getMap();

	$: if ($activeDestinationStore.deleteMode) {
		console.log('HIDE WAYPOINTS WHEN IN DELETE MODE');
	}

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
		.name-bubble {
			@apply text-sm rounded-full;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.waypoint-marker {
		canvas {
			transition: all ease 0.25s;
		}

		&:hover {
			z-index: 999999;
		}

		&:not(.active-destination):hover {
			@apply rounded-md flex flex-col justify-center bg-white bg-opacity-30;

			.name-bubble {
				@apply block;
			}
		}
	}
</style>
