<script>
	import { fade } from 'svelte/transition';
	import { addWaypointStore } from '../stores/addWaypoint';
	import { addDestinationStore } from '../stores/addDestination';
	import { activeDestinationStore } from '../stores/activeDestination';
	import AddWaypoint from '$lib/components/AddWaypoint.svelte';
	import AddDestination from '$lib/components/AddDestination.svelte';
	import DeleteDestinationConfirmation from './DeleteDestinationConfirmation.svelte';
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
		@apply h-[55px] relative z-50 px-8 -mt-[20px];

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
