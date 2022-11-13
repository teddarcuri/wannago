<script lang="ts">
	import { onMount } from 'svelte';
	import bootstrapMapbox from './util/bootstrapMapbox';
	import ActiveInfoDisplay from './components/ActiveInfoDisplay.svelte';
	import AddDestination from './components/AddDestination.svelte';
	import DestinationMarkers from './components/DestinationMarkers.svelte';
	import type { Map } from 'mapbox-gl';

	let map: Map;
	onMount(async () => (map = await bootstrapMapbox()));
</script>

<div id="mapbox-mount" />
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
