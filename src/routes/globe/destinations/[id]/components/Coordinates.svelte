<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';

	import { page } from '$app/stores';
	import { supabaseClient } from '@/lib/db';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';
	import getLatLngDisplayText from '@/lib/util/getLatLngDisplayText';

	export let lat: number;
	export let lng: number;
	export let disabled: boolean;

	$: isActive = $activeDestinationStore.editLocationMode;
	$: newLocation = $activeDestinationStore.newLocation;
	$: destinationId = $page.params.id;

	async function handleClick() {
		activeDestinationStore.update(s => ({ ...s, editLocationMode: !s.editLocationMode }));
		activeInfoDisplayStore.update(() => ({
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Drag and drop marker',
		}));
	}

	function handleCancel() {
		activeDestinationStore.update(s => ({ ...s, editLocationMode: false }));
		activeInfoDisplayStore.update(() => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: '',
		}));
	}

	async function handleUpdate() {
		if (newLocation) {
			const { lat, lng } = newLocation;
			console.log({
				lat,
				lng,
				id: Number(destinationId),
			});

			// Supabase Postgres function to update ST_Point/Geometry
			const { data, error } = await supabaseClient.rpc('update_destination_coordinates', {
				lat,
				lng,
				id: Number(destinationId),
			});

			if (error) return console.error(error);
			invalidateAll();

			activeDestinationStore.update(s => ({ ...s, editLocationMode: false }));
			activeInfoDisplayStore.update(s => ({
				status: ActiveInfoDisplayStatus.Success,
				displayText: 'New location saved',
			}));

			setTimeout(() => {
				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Normal,
					displayText: '',
				}));
			}, 2000);
		}
	}
</script>

<div class="flex mt-2">
	{#if isActive}
		<button class="active" on:click|preventDefault={handleUpdate}
			>Save new location
		</button>
		<button on:click|preventDefault={handleCancel}>Cancel</button>
	{:else}
		<button {disabled} class="inActive" on:click|preventDefault={handleClick}>
			<span>{getLatLngDisplayText(lat, lng)}</span>
		</button>
	{/if}
</div>

<style lang="scss">
	button:not([disabled]) {
		@apply ml-2 inline-flex w-auto p-2 px-4 flex-grow-0 rounded-full;

		&:first-child {
			@apply ml-[-12px];
		}
		&:hover {
			@apply bg-stone-600;
		}

		&.active {
			@apply bg-sky-800;
			&:hover {
				@apply bg-emerald-700;
			}
		}

		&.inActive {
			&:hover,
			&:focus {
				@apply bg-emerald-800;

				span {
					display: none;
				}

				&:before {
					content: 'Change Marker Location';
				}
			}
		}
	}
</style>
