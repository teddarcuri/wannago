<script lang="ts">
	import type { Map } from 'mapbox-gl';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import DestinationMarker from './DestinationMarker.svelte';

	export let map: Map;

	$: destinations = $userDestinationsStore.destinations;
</script>

{#each destinations as destination}
	<!-- 
		I do not like this...
		This means our marker rerenders anytime the destination updates.
		I have decided to take this approach so that the marker rerenders
		after I invalidate all caches. Namely the DestinationMarkers cache
		after updating the destination location. We have to have those new
		coordinates to update the marker position. 
	-->
	{#key destination}
		<DestinationMarker {map} {destination} />
	{/key}
{/each}
