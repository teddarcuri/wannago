<script lang="ts">
	import type { Map } from 'mapbox-gl';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import DestinationMarker from './DestinationMarker.svelte';

	export let map: Map;

	$: destinations = $userDestinationsStore.destinations;
</script>

{#each destinations as destination}
	<!-- I do not like this... forcing rerender -->
	{#key destination}
		<DestinationMarker {map} {destination} />
	{/key}
{/each}
