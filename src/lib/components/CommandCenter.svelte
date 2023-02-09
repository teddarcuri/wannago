<script>
	import { fade } from 'svelte/transition';
	import { addWaypointStore } from '$lib/stores/addWaypoint';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import { activeDestinationStore } from '$lib/stores/activeDestination';
	import AddWaypoint from '$lib/features/Waypoints/AddWaypoint.svelte';
	import AddDestination from '$lib/features/Destinations/AddDestination.svelte';
	import DeleteDestinationConfirmation from '$lib/features/Destinations/DeleteDestinationConfirmation.svelte';
</script>

<div class="root">
	{#if $activeDestinationStore.deleteMode}
		<section in:fade={{ delay: 111, duration: 111 }}>
			<DeleteDestinationConfirmation />
		</section>
	{/if}
	{#if $addWaypointStore.active}
		<section in:fade={{ delay: 111, duration: 111 }}>
			<AddWaypoint />
		</section>
	{/if}

	{#if $addDestinationStore.active}
		<section in:fade={{ delay: 333, duration: 111 }}>
			<AddDestination />
		</section>
	{/if}
</div>

<style lang="scss">
	.root {
		@apply h-[55px] fixed px-8 -mt-[20px] left-1/2 -translate-x-1/2;
		z-index: 999;

		@media screen and (max-width: 1268px) {
			@apply mt-[10px];
		}

		@media screen and (max-width: 768px) {
			@apply mt-[30px];
		}

		section {
			@apply h-full w-full flex flex-row 
			items-center justify-center;
		}
	}
</style>
