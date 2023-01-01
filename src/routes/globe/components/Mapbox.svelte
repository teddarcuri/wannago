<script lang="ts">
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import { onMount } from 'svelte';
	// @globe
	import bootstrapMapbox from '@globe/util/bootstrapMapbox';
	import AddWaypointMarker from './AddWaypointMarker.svelte';
	import ActiveInfoDisplay from '@globe/components/ActiveInfoDisplay.svelte';
	import DestinationMarkers from '@globe/components/DestinationMarkers.svelte';
	import { addWaypointStore } from '$lib/stores/addWaypoint';
	import { addDestinationStore } from '$lib/stores/addDestination';

	export let map: Map;
	onMount(async () => (map = await bootstrapMapbox())); // Setup mapbox-gl

	$: isRoot = $page.url.pathname === '/';
	$: isGallery = $page.routeId === '/globe/destinations/[id]/gallery';
	$: blur = isRoot || isGallery ? 'blur' : '';
	$: session = $page.data.session;
	$: border = $addWaypointStore.active || $addDestinationStore.marker;
</script>

<div id="mapbox-mount" class:blur class:border />

{#if map}
	{#if session && !isRoot}
		<ActiveInfoDisplay />
	{/if}
	<DestinationMarkers {map} />
	{#if $addWaypointStore.coordinates}
		<AddWaypointMarker {map} />
	{/if}
{/if}

<style lang="scss">
	#mapbox-mount {
		flex: 1 1 100%;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: all ease-in-out 0.333s;
		border: 0px solid transparent;

		&.border {
			border-radius: 20px;
			overflow: hidden;
			border-top: 55px solid transparent;
		}
	}

	:global(.mapboxgl-canvas) {
		outline: none;
	}

	.blur {
		@apply blur-md;
		transform: scale(1.069);
	}
</style>
