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
	import rotateCameraAroundPoint from '@routes/globe/util/rotateCameraAroundPoint';
	import getMarkerImgChildNode from '@routes/globe/util/getMarkerImgChildNode';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import confetti from 'canvas-confetti';
	import { fade } from 'svelte/transition';

	export let map: Map;

	let name = '';
	let loading = false;
	// $: screenPos = $addDestinationStore.screenPos;
	$: marker = $addDestinationStore.marker;

	$: if (marker) {
		console.log('MARKER', marker);
	}

	const handleSubmit = async () => {
		loading = true;
		let element = marker?._element;
		const img = getMarkerImgChildNode(element);
		img.src = spinner;
		element?.classList.add('loading');
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

				// launch center
				confetti({
					particleCount: 330,
					startVelocity: 75,
					spread: 99,
					scalar: 0.69,
					ticks: 160,
					gravity: 0.8,
					colors,
					origin: { y: 1.2 },
				});

				// // launch a few confetti from the left edge
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
					angle: 111,
					startVelocity: 69,
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
				marker?.remove();
				addDestinationStore.update(s => ({ marker: null, screenPos: null }));
				name = '';
				await goto(`/globe/destinations/${data.id}`);
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

{#if marker}
	<!-- <div
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
> -->

	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full h-full justify-center align-center items-center relative flex flex-row"
	>
		{#if loading}
			<div
				class="loading absolute flex items-center justify-center bg-black top-0 left-0 w-full h-full text-xl text-stone-200"
			>
				<img src={spinner} />
				<p>Creating Destination</p>
			</div>
		{/if}

		<input autofocus bind:value={name} placeholder="Name this Destination" />

		<div class="buttons">
			<button class="create" type="submit">Create</button>
			<button class="cancel" type="button" on:click={handleCancel}>Cancel</button>
		</div>
	</form>
	<!-- </div> -->
{:else}
	<div>
		<h2 class="text-xl text-stone-200">Create a new destination</h2>
		<h3 in:fade>Click anywhere on map to add new destination</h3>
	</div>

	<button class="cancel ml-4" type="button" on:click={handleCancel}>Cancel</button>
{/if}

<style lang="scss">
	.root {
		--angle: -50deg;
		background-image: linear-gradient(var(--angle), #2b3441, #3a4554);
	}

	h3 {
		@apply text-xl text-stone-600;
	}

	.loading {
		img {
			height: 33px;
			width: 33px;
			margin-right: 12px;
			transform: rotate(var(--angle));
			animation: 1s rotate ease-in-out infinite;
		}
	}

	.buttons {
		@apply ml-4;
	}

	button {
		@apply h-[33px] uppercase rounded-md px-4
			  text-zinc-600
			  tracking-widest text-xs
			  font-semibold
				hover:border-zinc-600
				hover:bg-gray-800
				hover:text-zinc-200
				active:bg-zinc-900;

		&.create {
			@apply bg-emerald-900 text-stone-300;

			&:hover {
				@apply bg-emerald-700;
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
		@apply text-2xl
		bg-transparent
		py-3
		text-white
		border-b
		border-solid
		border-transparent
		focus:outline-none
		placeholder-gray-500
		active:bg-transparent;

		&::placeholder {
			@apply text-stone-600;
		}

		&:focus {
			// @apply border-stone-600;
		}
	}
</style>
