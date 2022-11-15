<script lang="ts">
	import type { Map } from 'mapbox-gl';
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/db';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '$lib/stores/activeInfoDisplay';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import spinner from '$lib/img/spinner.svg';
	import addIcon from '$lib/img/add-icon.svg';
	import destination from '$lib/img/destination.svg';
	import rotateCameraAroundPoint from '../util/rotateCameraAroundPoint';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import { userDestinationsStore } from '$lib/stores/userDestinations';

	export let map: Map;

	let name = '';
	let loading = false;
	$: screenPos = $addDestinationStore.screenPos;
	$: marker = $addDestinationStore.marker;

	const handleSubmit = async () => {
		loading = true;
		let element = marker?._element;
		const img = getMarkerImgChildNode(element);
		img.src = spinner;
		element?.classList.add('loading');
		activeInfoDisplayStore.update((s) => ({
			...s,
			displayText: 'Creating Destination...'
		}));
		const { lng, lat } = marker?.getLngLat() ?? { lat: 0, lng: 0 };
		// map.flyTo({
		// 	center: [lng, lat]
		// });

		const { data, error } = await supabaseClient.rpc('new_destination_from_lng_lat', {
			name,
			lat,
			lng
		});

		if (error) {
			img.src = addIcon;
			loading = false;
			element?.classList.remove('loading');

			if (error.code === '42501') {
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Information,
					displayText: s.displayText
				}));
			} else {
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Error,
					displayText: 'error dude'
				}));
			}

			setTimeout(() => {
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Normal,
					displayText: "What's here?"
				}));
			}, 4000);
		}

		if (data) {
			setTimeout(async () => {
				const {
					coordinates: { coordinates: point }
				} = data; // yes, the double coordinates is unfortunate...

				userDestinationsStore.update((s) => ({
					destinations: [...s.destinations, data]
				}));

				await goto(`/globe/destinations/${data.name}`);
				loading = false;
				addDestinationStore.update((s) => ({ marker: null, screenPos: null }));
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Success,
					displayText: `Succesfully created ${data.name}`
				}));
			}, 2000);

			setTimeout(() => clearActiveInfoDisplay(), 9000);
		}
	};

	const clearActiveInfoDisplay = () => {
		activeInfoDisplayStore.update((s) => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: ''
		}));
	};

	const handleCancel = () => {
		marker?.remove();
		addDestinationStore.update((s) => ({ marker: null, screenPos: null }));
		clearActiveInfoDisplay();
	};
</script>

{#if marker && !loading}
	<div
		style:top={`${screenPos?.y}px`}
		style:left={`${screenPos?.x}px`}
		class="absolute z-50 
            h-[190px] w-[333px] 
            translate-x-6
            -translate-y-[106%]
            grid
            place-items-center
			rounded-lg
			overflow-hidden
            p-[2px]
            root
        "
	>
		{#if loading}
			<div class="absolute bg-black w-full h-full">Creating Destination</div>
		{/if}

		<form
			on:submit|preventDefault={handleSubmit}
			class="
              bg-zinc-900 p-4
                pt-9 w-full h-full flex flex-col
				rounded-lg

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
                    h-[40px]
					w-[40px]
					rounded-full
                    absolute
					top-2
					right-2
                    px-3
					text-xl
                  	text-zinc-400
                    hover:text-zinc-200
                    active:bg-zinc-900
                "
				type="button"
				on:click={handleCancel}>x</button
			>
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
		background-image: linear-gradient(var(--angle), #2b3441, #3a4554);
	}
</style>
