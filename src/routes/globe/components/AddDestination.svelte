<!-- TODO - THIS FILE IS RIPE FOR A CLEANUP-->
<script lang="ts">
	import type { Map } from 'mapbox-gl';
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/db';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '$lib/stores/activeInfoDisplay';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import spinner from '$lib/img/spinner.svg';
	import addIcon from '$lib/img/add-icon.svg';
	import destination from '$lib/img/destination.svg';
	import rotateCameraAroundPoint from '../util/rotateCameraAroundPoint';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import confetti from 'canvas-confetti';

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
		// ya... this needs to be changed...
		// const background = element.children[1];
		// background.classList.remove('blue');
		// background.classList.add('golden2');
		element?.classList.add('loading');
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Loading,
			displayText: 'Creating Destination...',
		}));
		const { lng, lat } = marker?.getLngLat() ?? { lat: 0, lng: 0 };
		const { data, error } = await supabaseClient.rpc('new_destination_from_lng_lat', {
			name,
			lat,
			lng,
		});

		if (error) {
			element?.classList.remove('loading');
			loading = false;
			img.src = addIcon;

			if (error.code === '42501') {
				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Information,
					displayText: s.displayText,
				}));
			} else {
				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Error,
					displayText: 'error dude',
				}));
			}

			setTimeout(() => {
				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Information,
					displayText: "What's here?",
				}));
			}, 4444);
		}

		if (data) {
			setTimeout(async () => {
				const {
					coordinates: { coordinates: point },
				} = data; // yes, the double coordinates is unfortunate...

				userDestinationsStore.update(s => ({
					destinations: [...s.destinations, data],
				}));

				element?.classList.remove('loading');
				loading = false;
				const colors = ['#65c597', '#307f6e', '#6fdbf6', '#c3cd40', '#3e7fbb'];
				// lunch center
				confetti({
					particleCount: 300,
					startVelocity: 60,
					spread: 111,
					scalar: 0.69,
					ticks: 300,
					gravity: 0.5,
					colors,
					origin: { y: 1 },
				});

				// launch a few confetti from the left edge
				confetti({
					particleCount: 333,
					angle: 60,
					spread: 55,
					scalar: 0.69,
					origin: { x: 0, y: 1 },
					colors,
				});

				// and launch a few from the right edge
				confetti({
					particleCount: 333,
					angle: 120,
					spread: 55,
					scalar: 0.69,
					origin: { x: 1, y: 1 },
					colors,
				});

				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Success,
					displayText: `Succesfully created ${data.name}`,
				}));
				// rotateCameraAroundPoint({ point, init: 0, map });
				await goto(`/globe/destinations/${data.id}`);
				marker?.remove();
				addDestinationStore.update(s => ({ marker: null, screenPos: null }));
			}, 2200);

			setTimeout(() => clearActiveInfoDisplay(), 7777);
		}
	};

	const clearActiveInfoDisplay = () => {
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: '',
		}));
	};

	const handleCancel = () => {
		marker?.remove();
		addDestinationStore.update(s => ({ marker: null, screenPos: null }));
		clearActiveInfoDisplay();
	};
</script>

{#if marker && !loading}
	<div
		style:top={`${screenPos?.y}px`}
		style:left={`${screenPos?.x}px`}
		class="absolute z-50 
            h-[180px] w-[333px] 
            translate-x-6
            -translate-y-[106%]
            grid
            place-items-center
			rounded-sm
			overflow-hidden
            p-[1px]
            root
        "
	>
		{#if loading}
			<div class="absolute bg-black w-full h-full">Creating Destination</div>
		{/if}

		<form
			on:submit|preventDefault={handleSubmit}
			class="
              bg-black p-6
            pt-9 w-full h-full
            flex flex-col
				rounded-sm
            "
		>
			<input
				bind:value={name}
				class="
                    mb-5 
                    bg-transparent
                    py-3
                    text-xl
                    text-white
                    focus:outline-none
					placeholder-gray-500
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
