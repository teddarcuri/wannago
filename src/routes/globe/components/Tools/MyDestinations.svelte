<script>
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import search from '$lib/img/search.svg';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';

	$: destinations = $userDestinationsStore.destinations;
	$: filteredDestinations = destinations.filter(destination => {
		return destination.name.toLowerCase().includes(searchQuery.toLowerCase());
	});

	let searchQuery = '';
</script>

<div class="root relative bg-black z-10 col-span-3">
	<div class="input-wrapper">
		<img src={search} height="14px" width="14px" />
		<input placeholder="Search your destinations" bind:value={searchQuery} />
		{#if searchQuery}
			<button class="clear" on:click={() => (searchQuery = '')}>X</button>
		{/if}
	</div>

	<div class="sticky top-[48px] z-40 pl-4 bg-black bg-opacity-80">
		<!-- <button>Alphabetical</button> -->
		<!-- <button>Recent</button> -->
		<!-- <button>By Type</button> -->
		<!-- <button>Nearby</button> -->
	</div>

	<ul>
		{#each filteredDestinations as destination}
			{@const icon = $userDestinationsStore.destinationTypes.find(
				type => type.id === destination.type_id,
			)?.icon}
			<li
				class="group"
				class:active={destination.id === $activeDestinationStore?.destination?.id}
				class:noImage={!destination?.images?.public_url}
			>
				{#if destination?.images?.public_url}
					<img class="bg" src={destination.images.public_url} />
				{/if}
				<a
					class="p-6 pt-0 pl-3 flex bg-black  hover:bg-gray-900"
					href={`/globe/destinations/${destination.id}`}
				>
					<img class="w-[26px] h-[26px] mt-2 mr-4" src={icon} />
					<div class="flex flex-col">
						<h4 class="text-lg">
							{destination.name}
						</h4>
						<p class="text-sm opacity-60">
							{getLatLngDisplayText(
								destination.coordinates.coordinates[1],
								destination.coordinates.coordinates[0],
							)}
						</p>
					</div>
				</a>

				<span
					class="
						pointer-events-none
						absolute  top-1/2 
						transform -translate-y-1/2 text-2xl
						group-hover:opacity-100 opacity-0 
						group-hover:right-5 right-0
						transition-all ease-in-out duration-200
				">></span
				>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.input-wrapper {
		@apply flex sticky
		overflow-hidden top-0 z-50;

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
			@apply border border-stone-800 
			text-left rounded-t-lg
			overflow-hidden;
			background: black;
			height: 44px;
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

	button {
		@apply font-bold tracking-widest text-stone-200 rounded-xl my-2 mr-1;
		background: #111;
		padding: 0 10px;
		height: 33px;
		// border-radius: 5px;
		text-transform: uppercase;
		font-size: 10px;

		&:hover {
			background: #333;
		}
	}

	li {
		@apply relative border border-stone-800;
		overflow: hidden;
		opacity: 0.6;
		background-size: 200%;
		overflow: hidden;
		display: block;

		&.noImage {
			background: repeating-linear-gradient(120deg, #000, #000 7px, #777 7px, #777 8px);
		}

		a {
			@apply pt-7;
			background: linear-gradient(111deg, black 30%, rgba(0, 0, 0, 0.7), transparent);

			&:hover {
				@apply border-stone-300;
			}
		}

		img.bg {
			@apply object-cover object-right w-[70%];
			z-index: -1;
			position: absolute;
			right: 0;
			top: 0;
			transition: all ease 0.2s;
			height: 100%;
		}

		&:hover {
			opacity: 1;

			img.bg {
				transform: scale(1.444);
			}
		}
	}
</style>
