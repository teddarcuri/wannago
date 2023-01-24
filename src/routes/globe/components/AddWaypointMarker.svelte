<script>
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import { beforeUpdate } from 'svelte';
	import createMarker, { MarkerType } from '../util/createMarker';
	export let map;

	let marker;
	let previousMarker;

	$: lat = $addWaypointStore.coordinates[0];
	$: lng = $addWaypointStore.coordinates[1];
	$: color = $addWaypointStore.color.hex;

	$: if (color) {
		previousMarker = marker;
		marker = createMarker({
			name: '+',
			map,
			lat,
			lng,
			color,
			isWaypoint: true,
			draggable: true,
			markerType: MarkerType.newDestination,
		});
		if (previousMarker) previousMarker.remove();
		marker.on('dragend', () => {
			const { lng, lat } = marker.getLngLat();
			addWaypointStore.update(s => ({
				...s,
				coordinates: [lat, lng],
			}));
		});
	}
</script>

<style global lang="scss">
	.add-waypoint-marker {
		position: absolute;
		// border-radius: 50%;
		border: solid red 100px !important;
		box-shadow: 0px 6px 8px 1px rgba(0, 0, 0, 0.444);
		z-index: 1;

		&:hover {
			cursor: pointer;
		}

		img {
			height: 20px;
			width: 20px;
			border-radius: 50%;
		}

		&:before {
			content: ' ';
			background: rgba(199, 199, 199, 0.555);
			display: block;
			z-index: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 44px;
			width: 33px;
			z-index: -1;
			border-radius: 13px;
		}
	}
</style>
