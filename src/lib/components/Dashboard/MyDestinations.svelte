<script>
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import search from '$lib/img/search.svg';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import { onMount } from 'svelte';
	$: destinations = $userDestinationsStore.destinations;

	$: filteredDestinations = destinations.filter(destination => {
		return destination.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	let searchQuery = '';
</script>

<div class="root relative z-10 col-span-3">
	<div class="input-wrapper">
		<img src={search} height="12px" width="12px" />
		<input placeholder="Find a Destination" bind:value={searchQuery} />
		{#if searchQuery}
			<button class="clear" on:click={() => (searchQuery = '')}>X</button>
		{/if}
	</div>

	<ul>
		{#each filteredDestinations as destination}
			<li class:active={destination.id === $activeDestinationStore?.destination?.id}>
				{#if destination?.cover_photo?.public_url}
					<img src={destination.cover_photo.public_url} />
				{/if}
				<a
					class="p-2 flex bg-black flex-col hover:bg-gray-900"
					href={`/globe/destinations/${destination.id}`}
				>
					<h4 class="text-lg">
						{destination.name}
					</h4>
					<!-- <p>
						{getLatLngDisplayText(
							destination.coordinates.coordinates[1],
							destination.coordinates.coordinates[0],
						)}
					</p> -->
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.input-wrapper {
		@apply flex relative;

		img {
			position: absolute;
			top: 50%;
			left: 20px;
			transform: translateY(-50%);
			transition: all ease 0.3s;
			visibility: visible;
			opacity: 1;
		}

		&:focus-within {
			img {
				visibility: hidden;
				opacity: 0;
			}
		}

		input {
			background: black;
			height: 55px;
			padding-left: 45px;
			width: 100%;
			border-bottom: solid 1px #444;
			transition: all ease 0.3s;

			&:hover {
				background: #222;
			}

			&:focus {
				padding-left: 20px;
				background: #222;
				outline: none;
				border-color: #ccc;
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
		overflow: hidden;
		border-bottom: solid 1px #444;
		opacity: 0.5;

		a {
			@apply border-2 border-transparent;
			background: linear-gradient(90deg, black 40%, rgba(0, 0, 0, 0.7), transparent);

			&:hover {
				@apply border-stone-700;
			}
		}

		img {
			@apply object-cover object-right w-[70%];
			z-index: -1;
			position: absolute;
			right: 0;
			top: 0;
			height: 100%;
		}

		&:hover {
			opacity: 1;
		}

		&.active {
			opacity: 1;
			a {
				@apply border-stone-400;
			}
		}
	}
</style>
