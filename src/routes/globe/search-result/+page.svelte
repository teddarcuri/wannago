<script>
	import { goto } from '$app/navigation';
	import ButtonPill from '@/lib/components/ButtonPill.svelte';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import { searchStore } from '@/lib/stores/search';
	import getLatLngDisplayText from '@/lib/util/getLatLngDisplayText';
	import DisplayCard from '../components/DisplayCard.svelte';

	$: console.log('SEARCH: ', $searchStore);

	const coordinates = getLatLngDisplayText(
		$searchStore.activeResult?.center[1],
		$searchStore.activeResult?.center[0],
	);

	const clearSearch = () => {
		alert('clearing search');
		searchStore.update(s => ({
			...s,
			activeResult: null,
		}));
	};

	const createDestinationFromSearchResult = async () => {
		await goto('/globe');
		activeDestinationStore.update(s => ({
			...s,
			active: true,
		}));
	};
</script>

<main>
	<DisplayCard>
		<div class="root group relative z-50 bg-black w-full rounded-lg">
			<!-- <h4 class="text-base text-stone-300 italic mb-2">Search Result</h4> -->
			<h1 class="text-2xl  bg-transparent font-semibold">
				{$searchStore.activeResult.place_name}
			</h1>

			<p class="my-4">{coordinates}</p>

			<ButtonPill on:click={createDestinationFromSearchResult}
				>Add as Destination</ButtonPill
			>
			<!-- <ButtonPill cancel={true} on:click={clearSearch}>Clear Result</ButtonPill> -->
		</div></DisplayCard
	>
</main>

<style lang="scss">
	@mixin barberpole-background {
		background: repeating-linear-gradient(120deg, #000, #000 11px, #222 11px, #222 12px);
		background-size: 200%;
		overflow: hidden;
		display: block;
	}

	main {
		@apply mt-[30px] pt-[20px] pb-3 px-[20px];
		position: relative;
		max-height: calc(100vh - 80px);
		overflow: auto;
		width: auto;
		align-self: flex-start;
		display: flex;
		flex-flow: column nowrap;
	}

	.root {
		@apply p-[40px] pt-[60px] border-stone-600 overflow-hidden rounded-lg;
		@include barberpole-background;

		&:hover {
			animation: barberpole 20s linear infinite;
		}
	}
</style>
