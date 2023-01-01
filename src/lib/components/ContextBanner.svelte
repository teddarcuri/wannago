<script>
	import { addWaypointStore } from '../stores/addWaypoint';
	import { addDestinationStore } from '../stores/addDestination';
	import { fade } from 'svelte/transition';
	import AddWaypoint from '$lib/components/AddWaypoint.svelte';
	import AddDestination from '$lib/components/AddDestination.svelte';

	let waypointName;

	const handleCancel = () => {
		addWaypointStore.update(s => ({
			active: false,
			coordinates: null,
		}));
	};
</script>

<div class="root">
	{#if $addWaypointStore.active}
		<section in:fade={{ delay: 111, duration: 111 }}>
			<AddWaypoint />
		</section>
	{/if}

	{#if $addDestinationStore.marker}
		<section in:fade={{ delay: 333, duration: 111 }}>
			<AddDestination />
		</section>
	{/if}
</div>

<style lang="scss">
	.root {
		@apply h-[55px];

		section {
			@apply h-full w-full flex flex-row 
			mt-[-18px]
			items-center justify-center;
		}
	}
</style>
