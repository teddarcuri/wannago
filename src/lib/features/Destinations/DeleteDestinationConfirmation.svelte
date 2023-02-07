<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { supabaseClient } from '@/lib/db';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';

	let confirmationValue = '';
	$: name = $activeDestinationStore?.destination?.name ?? 'destination';
	$: ready = confirmationValue.toLowerCase() === 'yes';

	const handleDelete = async () => {
		const { error } = await supabaseClient
			.from('destinations')
			.delete()
			.eq('id', $activeDestinationStore.destination.id);

		// write afunction that determines if this destination has a coverphoto url. if it does then delete the image from supabase storage
		if ($activeDestinationStore.destination.coverPhotoUrl) {
			const { error } = await supabaseClient.storage
				.from('images')
				.remove($activeDestinationStore.destination.coverPhotoUrl);
		}

		if (error) {
			activeInfoDisplayStore.update(s => ({
				...s,
				status: ActiveInfoDisplayStatus.Error,
				displayText: error.message,
			}));
		} else {
			await invalidateAll();
			activeInfoDisplayStore.update(s => ({
				...s,
				status: ActiveInfoDisplayStatus.Success,
				displayText: 'Destination deleted',
			}));
			activeDestinationStore.update(s => ({ ...s, deleteMode: false }));
			await goto('/globe');
			setTimeout(() => {
				activeInfoDisplayStore.update(s => ({
					...s,
					status: ActiveInfoDisplayStatus.Normal,
					displayText: '',
				}));
			}, 2000);
		}
	};
</script>

<div class="root flex flex-col">
	<h3 class="text-xl mt-5 font-semibold opacity-80">Are you sure?</h3>
	<!-- <p class="mb-2">
		This will permenatly delete this destination and all of it's waypoints and images
	</p> -->
	<form on:submit|preventDefault={handleDelete} class="flex">
		<input bind:value={confirmationValue} placeholder="Type 'yes' to delete" />
		<div class="flex items-center justify-end">
			<button
				type="submit"
				disabled={!ready}
				class:hide={!ready}
				class="confirm whitespace-nowrap">Delete {name}</button
			>
			<button
				on:click={() => activeDestinationStore.update(s => ({ ...s, deleteMode: false }))}
				>cancel</button
			>
		</div>
	</form>
</div>

<style lang="scss">
	.root {
		p {
			@apply opacity-50;
		}

		button {
			@apply h-[33px] uppercase rounded-md px-4
			  text-stone-200
			  tracking-widest text-xs
			  font-semibold
              opacity-100
              ml-2
				hover:border-zinc-600
				hover:bg-white
                hover:bg-opacity-10
				hover:text-zinc-200
				active:bg-zinc-900;

			&.hide {
				@apply opacity-0;
			}

			&.confirm {
				@apply bg-black bg-opacity-20 text-stone-300;

				&:hover {
					@apply bg-opacity-50;
				}
			}

			&.cancel {
				@apply bg-stone-800 text-stone-300 ml-2;

				&:hover {
					@apply bg-stone-600;
				}
			}
		}

		input {
			@apply text-xl
            bg-transparent
            py-3 w-full
            mb-6
            text-white
            border-solid
            focus:outline-none
            opacity-70
            placeholder-gray-500
            active:bg-transparent;

			&::placeholder {
				@apply text-stone-200 opacity-50;
			}

			&:focus {
				@apply opacity-100;
			}
		}
	}
</style>
