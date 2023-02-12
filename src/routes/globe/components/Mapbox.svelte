<script lang="ts">
	import { page } from '$app/stores';
	import type { Map } from 'mapbox-gl';
	import { onMount, setContext } from 'svelte';
	import bootstrapMapbox from '@globe/util/bootstrapMapbox';
	import AddWaypointMarker from './AddWaypointMarker.svelte';
	import ActiveInfoDisplay from '@globe/components/ActiveInfoDisplay.svelte';
	import DestinationMarkers from '@globe/components/DestinationMarkers.svelte';
	import CameraControls from '$lib/features/Mapbox/CameraControls.svelte';
	import { addWaypointStore } from '$lib/stores/addWaypoint';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import Tools from './Tools/Tools.svelte';
	import SearchMarker from './SearchMarker.svelte';
	import getLatLngDisplayText from '@/lib/util/getLatLngDisplayText';
	import { searchStore } from '@/lib/stores/search';
	import { authStore } from '$lib/stores/auth';

	export let map: Map;

	onMount(async () => {
		map = await bootstrapMapbox();

		map.on('mousemove', e => {
			const { lat, lng } = e.lngLat;
			mouseLatLng = getLatLngDisplayText(lat, lng);
			mouseCoordinates = e.point;
		});

		map.on('mouseout', () => {
			mouseLatLng = null;
			mouseCoordinates = null;
		});
	}); // Setup mapbox-gl

	$: setContext('map', { getMap: () => map }); // Provide map context - getMap is used instead of map because map is undefined onMount

	$: isRoot = $page.url.pathname === '/';
	$: isGallery = $page.routeId === '/globe/destinations/[id]/gallery';
	$: blur = isRoot || isGallery ? 'blur' : '';
	$: session = $page.data.session;
	$: border =
		$addWaypointStore.active ||
		$addDestinationStore.active ||
		$activeDestinationStore.deleteMode;
	$: user = $authStore.user;

	let mouseCoordinates = null;
	let mouseLatLng = null;

	// reset cursor to default on map canvas when addDestination.active is false
	$: if (!$addDestinationStore.active && map) {
		map.getCanvas().style.cursor = '';
	}
</script>

<div id="mapbox-mount" class:blur class:border />
<slot />

{#if mouseCoordinates && $addDestinationStore.active && !$addDestinationStore.marker && !$addDestinationStore.createFromSearchResult}
	<div
		style:left={mouseCoordinates.x + 5 + 'px'}
		style:top={mouseCoordinates.y + 150 + 'px'}
		class="cursor"
	>
		{mouseLatLng}
	</div>
{/if}

{#if map && session}
	{#if session && user && !isRoot && !isGallery}
		<ActiveInfoDisplay />
		{#if !$activeDestinationStore.deleteMode}
			<CameraControls />
		{/if}
	{/if}

	{#if !isGallery && user}
		<Tools {map} />
	{/if}
	<DestinationMarkers {map} />
	{#if $addWaypointStore.coordinates}
		<AddWaypointMarker {map} />
	{/if}
	{#key $searchStore?.activeResult?.id}
		<SearchMarker {map} />
	{/key}
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
		@apply bg-black h-[40px] px-3 rounded-md
		z-10 pointer-events-none
		flex items-center
		fixed;
	}

	:global(.mapboxgl-canvas) {
		outline: none;
	}

	.blur {
		@apply blur-xl;
		transform: scale(1.11);
	}
</style>
