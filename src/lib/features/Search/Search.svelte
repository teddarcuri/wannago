<script lang="ts">
	import { onMount } from 'svelte';
	import search from '$lib/img/search.svg';
	import spinner from '$lib/img/spinner.svg';
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
	import { searchStore } from '$lib/stores/search';
	import { goto } from '$app/navigation';
	import RecentSearches from './RecentSearches.svelte';
	import { SEARCH_HISTORY_LOCAL_STORAGE_KEY } from './constants';

	export let map;

	let searchQuery = '';
	let searchResults = [];
	let isLoading = false;
	let inputEl: HTMLInputElement;

	onMount(() => {
		// Don't like this, but without it, the input doesn't get focus
		setTimeout(() => {
			inputEl.focus();
		}, 222);
	});

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

	const updateHistory = debounce(data => {
		if (!searchQuery) return;
		searchStore.update(s => ({
			...s,
			history: [{ searchQuery, ...data }, ...s.history].splice(0, 8),
		}));
		// set the history in local storage
		localStorage.setItem(
			SEARCH_HISTORY_LOCAL_STORAGE_KEY,
			JSON.stringify($searchStore.history),
		);
	}, 2000);

	const searchDestinations = debounce(async () => {
		isLoading = true;
		searchStore.update(s => ({ ...s, activeHistory: null }));
		// Begin search
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
			searchStore.update(s => ({ ...s, data }));
		}, 222);

		updateHistory(data);
	}, 222);

	const setActiveSearchResult = async result => {
		searchStore.update(s => ({
			...s,
			activeResult: result,
		}));
		await goto('/globe');
		map.flyTo({ center: result.center, zoom: 15 });
	};

	// if there is a activehistory on the search store, set the search query to the active history searchQuery
	$: if ($searchStore.activeHistory) {
		searchQuery = $searchStore.activeHistory.searchQuery;
	}
</script>

<div class="root" class:hasResults={searchResults.length}>
	<div class="input-wrapper">
		<img src={search} height="14px" width="14px" />
		<input
			placeholder="Where do you Wannago?"
			on:input={searchDestinations}
			bind:value={searchQuery}
			bind:this={inputEl}
		/>
		{#if searchQuery}
			<button
				tabindex="-1"
				class="clear"
				on:click={() => {
					searchQuery = '';
					searchResults = [];
					if ($searchStore.activeHistory) {
						searchStore.update(s => ({
							...s,
							activeHistory: null,
						}));
					}
				}}>X</button
			>
		{/if}
	</div>

	{#if isLoading}
		<div class="loading grid place-items-center py-2">
			<img src={spinner} />
		</div>
	{/if}

	{#if $searchStore.activeHistory}
		{#each $searchStore.activeHistory.features as result}
			<button class="result" tabindex="0" on:click={() => setActiveSearchResult(result)}>
				{result.place_name}
			</button>
		{/each}
	{:else if searchQuery}
		{#if !isLoading}
			{#each searchResults as result}
				<button
					class="result"
					tabindex="0"
					on:click={() => setActiveSearchResult(result)}
				>
					{result.place_name}
				</button>
			{/each}
		{/if}
	{:else if $searchStore.history.length && !isLoading}
		<RecentSearches />
	{/if}
</div>

<style lang="scss">
	.root {
		@apply flex flex-col;

		&.hasResults {
			input {
				@apply rounded-b-none bg-stone-900;
			}
		}
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
			@apply text-left rounded-lg
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
				@apply outline-none 
				bg-stone-900
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
		}
	}

	input {
		color: #000;
	}

	button {
		@apply p-3 hover:bg-gray-900
		text-left;

		&.result {
			@apply text-sm opacity-80;
		}
	}
</style>
