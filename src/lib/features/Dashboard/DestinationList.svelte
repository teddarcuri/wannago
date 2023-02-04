<script>
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import search from '$lib/img/search.svg';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import VanillaTilt from 'vanilla-tilt';
	import { onMount } from 'svelte';
	import TiltTile from '$lib/components/TiltTile.svelte';

	$: destinations = $userDestinationsStore.destinations;
	$: filteredDestinations = destinations.filter(destination => {
		return destination.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	let searchQuery = '';

	onMount(() => {
		VanillaTilt.init(document.querySelector('.tilt-tile'), {
			max: 3,
			speed: 600,
		});
	});
</script>

<div class="root relative">
	{#if filteredDestinations.length}
		<div class="input-wrapper mb-8">
			<img src={search} height="14px" width="14px" />
			<input placeholder="Search your destinations" bind:value={searchQuery} />
			{#if searchQuery}
				<button class="clear" on:click={() => (searchQuery = '')}>X</button>
			{/if}
		</div>
	{:else}
		<h4>Your Destinations</h4>
		<p>Create some destinations</p>
	{/if}

	<div class="flex flex-col">
		{#each filteredDestinations as destination}
			{@const coordinates = getLatLngDisplayText(
				destination.coordinates.coordinates[1],
				destination.coordinates.coordinates[0],
			)}
			<div class="h-[200px] w-full mb-3">
				<TiltTile
					maxTilt={5}
					title={destination.name}
					subtitle={coordinates}
					img={destination?.images?.public_url}
					link={`/globe/destinations/${destination.id}`}
				/>
			</div>

			<!-- 
				<a
					class="p-3 tilt-tile flex bg-black flex-col hover:bg-gray-900"
					href={`/globe/destinations/${destination.id}`}
				>
					<h4 class="text-2xl">
						{destination.name}
					</h4>
					<p>
						{}
					</p>
				</a> -->
		{/each}
	</div>
</div>

<style lang="scss">
	.input-wrapper {
		@apply flex sticky
		overflow-hidden top-[-60px] z-50;

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
