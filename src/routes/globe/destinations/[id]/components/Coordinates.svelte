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
			displayText: 'Editing Location',
		}));
	}

	function handleCancel() {
		activeDestinationStore.update(s => ({
			...s,
			newLocation: null,
			editLocationMode: false,
		}));
		$activeDestinationStore.marker?.setLngLat([lng, lat]);
		activeInfoDisplayStore.update(() => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: '',
		}));
	}

	async function handleUpdate() {
		if (newLocation) {
			const { lat, lng } = newLocation;
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
		{#if newLocation}
			<button class:hasChanged={newLocation} on:click|preventDefault={handleUpdate}
				>Save new location
			</button>
		{/if}
		<button class:cancel={true} on:click|preventDefault={handleCancel}>Cancel</button>
	{:else}
		<button {disabled} class="inActive" on:click|preventDefault={handleClick}>
			<span>{getLatLngDisplayText(lat, lng)}</span>
		</button>
	{/if}
</div>

<style lang="scss">
	.cancel {
		@apply bg-stone-600;
	}

	button {
		@apply ml-2 inline-flex w-auto p-2 px-4 flex-grow-0 rounded-full;

		&:first-child {
			@apply ml-[-12px];
		}
		&:hover {
			@apply bg-stone-600;
		}

		&.hasChanged {
			@apply bg-sky-800;
			&:hover {
				@apply bg-emerald-700;
			}
		}

		&.inActive {
			background: none;
			&:not([disabled]):hover,
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
