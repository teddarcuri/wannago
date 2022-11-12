<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore, addDestinationStore } from '../stores';

	let name = '';
	$: screenPos = $addDestinationStore.screenPos;
	$: marker = $addDestinationStore.marker;

	const handleSubmit = async () => {
		const { lng, lat } = marker.getLngLat();
		const { data, error } = await supabaseClient.rpc('new_destination_from_lng_lat', {
			name,
			lat,
			lng
		});

		if (data)
			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Success,
				displayText: `Succesfully created ${data.name}`
			}));
	};
</script>

{#if marker}
	<div
		style:top={`${screenPos?.y}px`}
		style:left={`${screenPos?.x}px`}
		class="absolute z-50 
            h-[180px] w-[300px] 
            translate-x-6
            -translate-y-[106%]
            grid
            place-items-center
            p-[2px]
            root
        "
	>
		<form
			on:submit|preventDefault={handleSubmit}
			class="
              bg-zinc-900 p-4 
                pt-9 w-full h-full flex flex-col
            "
		>
			<input
				bind:value={name}
				class="
                    mb-5 border-b-2 
                    border-zinc-500
                    bg-transparent
                    py-3
                    text-xl
                    text-white
                    focus:outline-none
                    active:bg-transparent
                "
				placeholder="Name this Destination"
			/>
			<button
				class="
                    h-[44px]
                    self-end
                    rounded-md
                    px-6
                  text-zinc-600
                    hover:border-zinc-600
                    hover:bg-gray-800
                    hover:text-zinc-200
                    active:bg-zinc-900
                "
				type="submit">Create</button
			>
		</form>
	</div>
{/if}

<style>
	.root {
		--angle: -50deg;
		background-image: linear-gradient(var(--angle), #4c5563, #94a3b8);
	}
</style>
