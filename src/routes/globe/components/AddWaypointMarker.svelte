<script>
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import createMarker from '../util/createMarker';

	export let map;
	let lat = $addWaypointStore.coordinates[0];
	let lng = $addWaypointStore.coordinates[1];

	const marker = createMarker({
		name: '+',
		map,
		lat,
		lng,
		isWaypoint: true,
	});
</script>

<style global lang="scss">
	.add-waypoint-marker {
		border-radius: 50%;
		box-shadow: 0px 6px 8px 1px rgba(0, 0, 0, 0.444);
	}
</style>
