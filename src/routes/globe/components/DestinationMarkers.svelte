<script lang="ts">
	import type { Map } from 'mapbox-gl';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import DestinationMarker from './DestinationMarker.svelte';

	export let map: Map;

	$: destinations = $userDestinationsStore.destinations;
</script>

{#each destinations as destination}
	<DestinationMarker {map} {destination} />
{/each}
