<script>
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import { fade, scale } from 'svelte/transition';
	import searchIcon from '$lib/img/search.svg';
	import mountainIcon from '$lib/img/mountain.svg';
	import FloatingWindow from './FloatingWindow.svelte';
	import MyDestinations from '@/routes/globe/components/Tools/MyDestinations.svelte';
	import Search from './Search.svelte';

	MyDestinations;
	const setAddDestinationActive = () => {
		addDestinationStore.update(s => ({ ...s, active: true }));
	};

	$: hide = $addDestinationStore.active;
	let showDestinations = false;
	let showSearch = false;
</script>

{#if !hide}
	<div
		in:scale={{ delay: 333, duration: 111 }}
		out:fade={{ delay: 0, duration: 90 }}
		class="root"
	>
		<button on:click={setAddDestinationActive}>+</button>
		<span class="relative">
			<button
				class="text-md ml-3"
				on:click={() => (showDestinations = !showDestinations)}
			>
				<img class="w-[19px] h-[19px]" src={mountainIcon} alt="search" />
			</button>
			{#if showDestinations}
				<FloatingWindow>
					<MyDestinations />
				</FloatingWindow>
			{/if}
		</span>
		<span class="relative">
			<button class="text-md ml-3" on:click={() => (showSearch = !showSearch)}>
				<img class="w-[14px] h-[14px]" src={searchIcon} alt="search" />
			</button>
			{#if showSearch}
				<FloatingWindow>
					<Search />
				</FloatingWindow>
			{/if}
		</span>
	</div>
{/if}

<style lang="scss">
	.root {
		@apply absolute flex top-[46px] left-[14px];
		z-index: 998;
	}

	button {
		@apply bg-black h-[46px] w-[46px] grid place-items-center text-3xl rounded-md
        text-stone-200;

		&:hover {
			@apply bg-stone-800 text-white;
		}
	}
</style>
