<script>
	import { userDestinationsStore } from '@/lib/stores/userDestinations';
	import getLatLngDisplayText from '@/lib/util/getLatLngDisplayText';
	$: destinations = $userDestinationsStore.destinations;
</script>

<div class=" relative z-10 col-span-3">
	<!-- <h2 class="text-2xl opacity-60 mt-4 mb-10">My Destinations</h2> -->
	<ul>
		{#each destinations as destination}
			<li class="mb-6">
				{#if destination?.cover_photo?.public_url}
					<img src={destination.cover_photo.public_url} />
				{/if}
				<a
					class="p-8 flex bg-black flex-col hover:bg-gray-900"
					href={`/globe/destinations/${destination.id}`}
				>
					<h4 class="text-2xl">
						{destination.name}
					</h4>
					<p>
						{getLatLngDisplayText(
							destination.coordinates.coordinates[1],
							destination.coordinates.coordinates[0],
						)}
					</p>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	div {
		opacity: 0.8;
		overflow: hidden;

		&:hover {
			opacity: 1;
		}
	}

	li {
		@apply relative;

		a {
			@apply border-2 border-transparent;
			background: linear-gradient(90deg, black 40%, rgba(0, 0, 0, 0.7), transparent);

			&:hover {
				@apply border-white;
			}
		}
	}

	img {
		@apply object-cover object-right
        w-[70%];
		z-index: -1;
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
	}
</style>
