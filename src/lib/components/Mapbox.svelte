<script lang="ts">
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import { onMount } from 'svelte';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	// @globe
	import bootstrapMapbox from '@globe/util/bootstrapMapbox';
	import ActiveInfoDisplay from '@globe/components/ActiveInfoDisplay.svelte';
	import AddDestination from '@globe/components/AddDestination.svelte';
	import DestinationMarkers from '@globe/components/DestinationMarkers.svelte';
	import DeveloperTools from './DeveloperTools.svelte';
	let map: Map;
	onMount(async () => (map = await bootstrapMapbox()));

	$: isRoot = $page.url.pathname === '/';
	$: isGallery = $page.routeId === '/globe/destinations/[slug]/gallery';
	$: blur = isRoot || isGallery ? 'blur' : '';
	$: session = $page.data.session;
</script>

<div id="mapbox-mount" class:blur />
<DeveloperTools />
{#if map}
	{#if session && !isRoot}
		<ActiveInfoDisplay />
	{/if}
	<AddDestination {map} />
	<DestinationMarkers {map} />
{/if}
<slot />

<style>
	#mapbox-mount {
		width: 100%;
		height: 100%;
		transition: all ease-in-out 1s;
	}

	:global(.mapboxgl-canvas) {
		outline: none;
	}

	.blur {
		@apply blur-md;
		transform: scale(1.11);
	}
</style>
