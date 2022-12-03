<script>
	import { userDestinationsStore } from '@/lib/stores/userDestinations';
	import { onMount } from 'svelte';
	import VanillaTilt from 'vanilla-tilt';
	onMount(() => {
		VanillaTilt.init(document.querySelector('.tilt-tile')[0], {
			max: 5,
			speed: 600,
		});
	});
	$: destinations = $userDestinationsStore.destinations;
</script>

<div class="w-[444px] relative z-10 col-span-3">
	<!-- <h2 class="text-2xl opacity-60 mt-4 mb-10">My Destinations</h2> -->
	<ul>
		{#each destinations as destination}
			<li class="mb-6">
				<a
					class="tilt-tile p-8 flex rounded-md bg-black hover:bg-gray-900"
					href={`/globe/destinations/${destination.name}`}
				>
					<h4 class="text-2xl">
						{destination.name}
					</h4>
					<p>
						<!-- {JSON.stringify(coordinates)} -->
					</p>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	div {
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}
</style>
