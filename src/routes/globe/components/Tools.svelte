<script>
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import { fly, scale } from 'svelte/transition';
	import searchIcon from '$lib/img/search.svg';
	import SearchBox from './SearchBox.svelte';
	const setAddDestinationActive = () => {
		addDestinationStore.update(s => ({ ...s, active: true }));
	};

	$: hide = $addDestinationStore.active;
	let showSearch = false;
</script>

{#if !hide}
	<div in:scale={{ delay: 333, duration: 111 }} class="root">
		<button on:click={setAddDestinationActive}>+</button>
		<span class="relative">
			<button class="text-md ml-3" on:click={() => (showSearch = !showSearch)}>
				<img class="w-[14px] h-[14px]" src={searchIcon} alt="search" />
			</button>
			{#if showSearch}
				<SearchBox />
			{/if}
		</span>
	</div>
{/if}

<style lang="scss">
	.root {
		@apply absolute flex top-[46px] left-[14px] z-50;
	}

	button {
		@apply bg-black h-[46px] w-[46px] grid place-items-center text-3xl rounded-md
        text-stone-200;

		&:hover {
			@apply bg-stone-800 text-white;
		}
	}
</style>
