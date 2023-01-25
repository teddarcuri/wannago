<script lang="ts">
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import { onMount, setContext } from 'svelte';
	// @globe
	import bootstrapMapbox from '@globe/util/bootstrapMapbox';
	import AddWaypointMarker from './AddWaypointMarker.svelte';
	import ActiveInfoDisplay from '@globe/components/ActiveInfoDisplay.svelte';
	import DestinationMarkers from '@globe/components/DestinationMarkers.svelte';
	import { addWaypointStore } from '$lib/stores/addWaypoint';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import Tools from './Tools/Tools.svelte';
	import WaypointMarkers from './WaypointMarkers.svelte';
	import SearchMarker from './SearchMarker.svelte';
	import { searchStore } from '@/lib/stores/search';

	export let map: Map;
	onMount(async () => (map = await bootstrapMapbox())); // Setup mapbox-gl
	setContext('map', { getMap: () => map }); // Provide map context - getMap is used instead of map because map is undefined onMount

	$: isRoot = $page.url.pathname === '/';
	$: isGlobe = $page.url.pathname === '/globe';
	$: isGallery = $page.routeId === '/globe/destinations/[id]/gallery';
	$: blur = isRoot || isGallery ? 'blur' : '';
	$: session = $page.data.session;
	$: border =
		$addWaypointStore.active ||
		$addDestinationStore.active ||
		$activeDestinationStore.deleteMode;
	$: showCursor = $addWaypointStore.active || $addDestinationStore.active;

	// reset cursor to default on map canvas when addDestination.active is false
	// $: if (!$addDestinationStore.active) {
	// 	map?.getCanvas().style.cursor = 'default';
	// }

	$: console.log('SEAAARCHHH: ', $searchStore);
</script>

<div id="mapbox-mount" class:blur class:border class:showCursor />
<slot />

{#if $addWaypointStore.mousePos}
	<div
		style:left={$addWaypointStore?.mousePos?.x + 'px'}
		style:top={$addWaypointStore?.mousePos?.y + 160 + 'px'}
		class="cursor"
	/>
{/if}
{#if map}
	{#if session && !isRoot}
		<ActiveInfoDisplay />
	{/if}
	{#if !isRoot}
		<Tools {map} />
	{/if}
	<DestinationMarkers {map} />
	{#if $addWaypointStore.coordinates}
		<AddWaypointMarker {map} />
	{/if}
	<SearchMarker {map} />
{/if}

<style lang="scss">
	#mapbox-mount {
		flex: 1 1 100%;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		cursor: crosshair !important;
		transition: all ease-in-out 0.333s;
		border: 0px solid transparent;

		&.border {
			border-top: 70px solid transparent;
		}

		@media screen and (max-width: 1268px) {
			&.border {
				border-top: 120px solid transparent;
			}
		}

		@media screen and (max-width: 768px) {
			&.border {
				border-top: 150px solid transparent;
			}
		}
	}

	.cursor {
		@apply h-6 w-6 
		border-4 border-black
		rounded-full
		 z-10 pointer-events-none
		fixed top-1/2 left-1/2
		-translate-x-1/2 -translate-y-8;
	}

	:global(.mapboxgl-canvas) {
		outline: none;
	}

	.blur {
		@apply blur-md;
		transform: scale(1.069);
	}
</style>
