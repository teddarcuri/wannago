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
	import Delete from './Delete.svelte';

	export let lat: number;
	export let lng: number;
	export let disabled: boolean;

	$: isActive = $activeDestinationStore.editLocationMode;
	$: newLocation = $activeDestinationStore.newLocation;
	$: destinationId = $page.params.id;
	$: isGallery = $page.url.pathname.includes('gallery');

	async function handleClick() {
		activeDestinationStore.update(s => ({ ...s, editLocationMode: !s.editLocationMode }));
		activeInfoDisplayStore.update(() => ({
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Drag Marker to New Location',
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

			// yuck
			invalidateAll();

			activeDestinationStore.update(s => ({
				...s,
				editLocationMode: false,
			}));
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

<div class:isGallery class="root flex">
	{#if isActive}
		{#if newLocation}
			<button class:save={true} on:click|preventDefault={handleUpdate}
				>Save new location
			</button>
		{/if}
		<button class:cancel={true} on:click|preventDefault={handleCancel}>Cancel</button>
	{:else}
		<!-- <button class="fly-to bg-black hover:bg-emerald-900">Zoom Here</button> -->
		<button {disabled} class="inActive" on:click|preventDefault={handleClick}>
			<span>{getLatLngDisplayText(lat, lng)}</span>
		</button>
		<Delete ref="delete" />
	{/if}
</div>

<style lang="scss">
	.root {
		:global([ref='delete']) {
			display: none;
		}

		.fly-to {
			display: none;
		}

		&:hover {
			.fly-to {
				display: block;
			}
		}
	}

	.save {
		@apply bg-sky-800;
		&:hover {
			@apply bg-emerald-700;
		}
	}

	.root:not(.isGallery) {
		&:hover {
			:global([ref='delete']) {
				display: block;
			}

			button.inActive {
				span {
					display: none;
				}

				&:before {
					content: 'Edit Location';
				}

				&:hover {
					@apply bg-sky-900;
				}
			}
		}
	}

	.root :global(button) {
		@apply tracking-wide ml-2 text-sm inline-flex w-auto p-2 px-3 flex-grow-0 rounded-md;

		&:first-child {
			@apply ml-[-12px];
		}

		&.inActive {
			background: none;

			&:focus {
				@apply bg-emerald-800;

				span {
					display: none;
				}

				&:before {
					content: 'Change Location';
				}
			}
		}
	}
</style>
