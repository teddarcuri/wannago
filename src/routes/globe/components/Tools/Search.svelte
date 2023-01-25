<script lang="ts">
	import search from '$lib/img/search.svg';
	import spinner from '$lib/img/spinner.svg';

	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
	import { searchStore } from '@/lib/stores/search';
	import { goto } from '$app/navigation';

	export let map;

	let searchQuery = '';
	let searchResults = [];
	let isLoading = false;

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
		isLoading = true;
		// get the current center lat long from mapbox map
		// this sorts the results by proximity to the center of the current map
		const center = map.getCenter();
		const { lng, lat } = center;
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json
				?access_token=${PUBLIC_MAPBOX_ACCESS_TOKEN}
				&proximity=${lng},${lat}
			`,
		);
		const data = await response.json();
		setTimeout(() => {
			isLoading = false;
			searchResults = data.features;
		}, 555);
	}, 222);

	const setActiveSearchResult = async result => {
		console.log('RESULT: ', result);
		searchStore.update(s => ({
			activeResult: result,
		}));
		await goto('/globe/search-result');
		map.flyTo({ center: result.center, zoom: 15 });
	};
</script>

<div class="root">
	<div class="input-wrapper">
		<img src={search} height="14px" width="14px" />
		<input
			placeholder="Where do you Wannago?"
			on:input={searchDestinations}
			bind:value={searchQuery}
		/>
		{#if searchQuery}
			<button tabindex="-1" class="clear" on:click={() => (searchQuery = '')}>X</button>
		{/if}
	</div>

	{#if isLoading}
		<div class="loading grid place-items-center py-2">
			<img src={spinner} />
		</div>
	{/if}

	{#if searchQuery}
		{#if !isLoading}
			{#each searchResults as result}
				<button tabindex="0" on:click={() => setActiveSearchResult(result)}>
					{result.place_name}
				</button>
			{/each}
		{/if}
	{/if}
</div>

<style lang="scss">
	.root {
		@apply flex flex-col;
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
			overflow-hidden text-stone-100;
			background: black;
			height: 48px;
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
		}
	}

	input {
		color: #000;
	}

	button {
		@apply p-3 hover:bg-gray-900
		text-left;
	}
</style>
