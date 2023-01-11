<script lang="ts">
	let searchQuery = '';
	let searchResults = [];

	// create a searchDestinations function, debounced ever 500ms, that will fetch destination data from the MApbox API then set the searchResults variable
	// create a debounce function that takes a function and a delay
	const debounce = (fn, delay) => {
		let timeoutId;
		return (...args) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				fn.apply(null, args);
			}, delay);
		};
	};

	const searchDestinations = debounce(async () => {
		console.log('CALLLLL: ', searchQuery);
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${
				import.meta.env.VITE_MAPBOX_TOKEN
			}`,
		);
		const data = await response.json();
		searchResults = data.features;
	}, 500);

	$: console.log('RESULTS: ', searchResults);
</script>

<input on:change={searchDestinations} bind:value={searchQuery} />
{#if searchQuery}
	<ul>
		{#each searchResults as result}
			<li>
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${result.coordinates[1]},${result.coordinates[0]}`}
				>
					{result.name}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	input {
		color: #000;
	}
</style>
