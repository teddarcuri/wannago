<script lang="ts">
	import { onMount } from 'svelte';
	import bootstrapMapbox from './util/bootstrapMapbox';
	import ActiveInfoDisplay from './components/ActiveInfoDisplay.svelte';
	import AddDestination from './components/AddDestination.svelte';
	import DestinationMarkers from './components/DestinationMarkers.svelte';
	import type { Map } from 'mapbox-gl';
	import { userDestinationsStore } from '$lib/stores/userDestinations';

	let map: Map;
	onMount(async () => (map = await bootstrapMapbox()));

	$: storeDump = JSON.stringify($userDestinationsStore);
</script>

<div id="mapbox-mount" />
<!-- <div class="absolute bottom-0 left-0 p-7 overflow-auto w-[400px] h-[200px] bg-gray-900">
	{storeDump}
</div> -->
{#if map}
	<ActiveInfoDisplay />
	<AddDestination {map} />
	<DestinationMarkers {map} />
{/if}
<slot />

<style>
	#mapbox-mount {
		width: 100%;
		height: 100%;
	}
</style>
