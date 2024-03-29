<script>
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import search from '$lib/img/search.svg';
	import TiltTile from '$lib/components/TiltTile.svelte';
	import iconStrip from '$lib/img/icon-strip.png';
	import LoadingOverlay from '$lib/components/LoadingOverlay.svelte';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';

	let searchQuery = '';

	$: destinations = $userDestinationsStore.destinations;
	$: filteredDestinations = destinations.filter(destination => {
		return destination.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	$: loading = !$userDestinationsStore.hasFetched;

	// when component unmounts, ensure filteredDestinations is reset
	onDestroy(() => {
		// This is so frustrating
		// what this is doing is ensuring that when switching accounts, this component doesn't
		// flash with the last account's destinations before the new account's destinations are fetched
		// Why resetting the stores upon logout doesn't work is beyond me
		searchQuery = '';
	});
</script>

<div in:fly={{ y: 20, duration: 500, delay: 200 }} class="root relative mt-8">
	{#if loading}<LoadingOverlay />{/if}
	{#if $userDestinationsStore.hasFetched}
		{#if filteredDestinations.length > 3 || searchQuery}
			<div class="input-wrapper">
				<img src={search} height="14px" width="14px" />
				<input placeholder="Search your destinations" bind:value={searchQuery} />
				{#if searchQuery}
					<button class="clear" on:click={() => (searchQuery = '')}>X</button>
				{/if}
			</div>
		{/if}
		{#if filteredDestinations.length === 0 && !searchQuery}
			<div class="blank-state bg-black p-[40px] rounded-md">
				<h4 class="text-xl opacity-50 my-4 text-left">Welcome to wannago</h4>

				<h4 class="text-base opacity-30 my-4">Create some destinations to get started</h4>

				<img class=" opacity-30 my-5" src={iconStrip} />
			</div>
		{/if}

		<div class="flex flex-row flex-wrap">
			{#each filteredDestinations as destination}
				{@const coordinates = getLatLngDisplayText(
					destination.coordinates.coordinates[1],
					destination.coordinates.coordinates[0],
				)}
				<div class="tile-wrapper">
					<TiltTile
						maxTilt={5}
						title={destination.name}
						subtitle={coordinates}
						img={destination?.images?.public_url}
						link={`/globe/destinations/${destination.id}`}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.blank-state {
		box-shadow: 0 0 10px 1px rgba(194, 209, 227, 0.1);
		transition: box-shadow 0.88s ease;
	}

	.tile-wrapper {
		@apply w-1/2 p-2 h-[200px];

		@media (max-width: 640px) {
			@apply w-full p-3 h-[150px];
		}
	}

	.input-wrapper {
		@apply flex sticky
		overflow-hidden top-[-32px] z-50;

		img {
			position: absolute;
			top: 50%;
			left: 20px;
			transform: translateY(-50%);
			transition: all ease 0.3s;
			visibility: visible;
			opacity: 0.7;
		}

		&:focus-within {
			img {
				visibility: hidden;
				opacity: 0;
			}
		}

		input {
			@apply text-left rounded-lg
            bg-black border border-zinc-900
			overflow-hidden;
			height: 60px;
			padding-left: 48px;
			width: 100%;
			transition: all ease 0.3s;

			&:hover {
				background: #222;
			}

			&:focus {
				@apply border outline-none 
				
				pl-[11px];
			}
		}

		button {
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
			background: #111;
			padding: 6px 12px;
			border-radius: 5px;
			text-transform: uppercase;
			font-size: 12px;

			&:hover {
				background: #333;
			}
		}
	}

	li {
		@apply relative;
	}
</style>
