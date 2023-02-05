<script lang="ts">
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import { fade, scale } from 'svelte/transition';
	import searchIcon from '$lib/img/search.svg';
	import globeIcon from '$lib/img/globe.svg';
	import mountainIcon from '$lib/img/mountain.svg';
	import FloatingWindow from './FloatingWindow.svelte';
	import MyDestinations from '@/routes/globe/components/Tools/MyDestinations.svelte';
	import Search from '@/lib/features/Search/Search.svelte';
	import MapboxOptions from './MapboxOptions.svelte';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import { goto } from '$app/navigation';

	const setAddDestinationActive = async () => {
		map.getCanvas().style.cursor = 'crosshair';
		await goto('/globe');
		addDestinationStore.update(s => ({ ...s, active: true }));
	};

	enum Tool {
		search,
		destinations,
		mapboxOptions,
	}

	export let map;
	$: hide =
		$addDestinationStore.active ||
		$activeDestinationStore.deleteMode ||
		$addWaypointStore.active;
	let activeTool: Tool | null = null;
	const toggleTool = (tool: Tool) => {
		activeTool = activeTool === tool ? null : tool;
	};
</script>

{#if !hide}
	<div
		in:scale={{ delay: 333, duration: 111 }}
		out:fade={{ delay: 0, duration: 90 }}
		class="root"
	>
		<button title="Create Destination" on:click={setAddDestinationActive}
			><span class="font-bold text-4xl">+</span></button
		>

		<span class="relative">
			<button
				title="My Destinations"
				class:active={activeTool === Tool.destinations}
				class="text-md ml-3"
				on:click={() => {
					toggleTool(Tool.destinations);
				}}
			>
				<img class="w-[22px] h-[22px]" src={mountainIcon} alt="search" />
			</button>
			{#if activeTool === Tool.destinations}
				<FloatingWindow>
					<MyDestinations />
				</FloatingWindow>
			{/if}
		</span>
		<span class="relative">
			<button
				title="Map Options"
				class:active={activeTool === Tool.mapboxOptions}
				class="text-md ml-3"
				on:click={() => toggleTool(Tool.mapboxOptions)}
			>
				<img class="w-[28px] h-[28px]" src={globeIcon} alt="search" />
			</button>
			{#if activeTool === Tool.mapboxOptions}
				<FloatingWindow>
					<MapboxOptions {map} />
				</FloatingWindow>
			{/if}
		</span>
		<span class="relative">
			<button
				title="Find something"
				class:active={activeTool === Tool.search}
				class="text-md ml-3"
				on:click={() => toggleTool(Tool.search)}
			>
				<img class="w-[19px] h-[19px]" src={searchIcon} alt="search" />
			</button>
			{#if activeTool === Tool.search}
				<FloatingWindow>
					<Search {map} />
				</FloatingWindow>
			{/if}
		</span>
	</div>
{/if}

<style lang="scss">
	.root {
		@apply fixed flex top-[15px] right-[20px];
		z-index: 1001;
	}

	button {
		@apply bg-black h-[48px] w-[48px] grid place-items-center rounded-md
        text-stone-200;

		&.active {
			@apply bg-stone-800;
		}

		&:hover {
			@apply bg-stone-800 text-white;
		}
	}
</style>
