<script>
	import { userDestinationsStore } from '@/lib/stores/userDestinations';

	$: destinations = $userDestinationsStore.destinations;
</script>

<div class=" relative z-10 col-span-3">
	<h2 class="text-2xl opacity-60 mt-4 mb-10">My Destinations</h2>
	<ul>
		{#each destinations as destination}
			<li class="mb-6">
				<a
					class="p-8 flex rounded-md bg-stone-900 hover:bg-gray-900"
					href={`/globe/destinations/${destination.name}`}
				>
					<h4 class="text-2xl">
						{destination.name}
					</h4>
				</a>
			</li>
		{/each}
	</ul>
</div>
