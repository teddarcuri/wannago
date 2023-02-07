<script lang="ts">
	import { goto } from '$app/navigation';
	import ButtonPill from '@/lib/components/ButtonPill.svelte';
	import { searchStore } from '@/lib/stores/search';
	import getLatLngDisplayText from '@/lib/util/getLatLngDisplayText';
	import DisplayCard from '$lib/components/DisplayCard.svelte';
	import { getContext } from 'svelte';
	import closeIcon from '$lib/img/close.svg';
	import centerIcon from '$lib/img/center.svg';
	import { addDestinationStore } from '@/lib/stores/addDestination';

	const { getMap } = getContext('map');
	const map = getMap();

	const lat = $searchStore.activeResult?.center[1];
	const lng = $searchStore.activeResult?.center[0];

	const coordinates = getLatLngDisplayText(lat, lng);

	const clearSearch = async () => {
		await goto('/globe');
		searchStore.update(s => ({
			...s,
			activeResult: null,
		}));
	};

	const handleFlyTo = () => {
		map.flyTo({
			center: [lng, lat],
			zoom: 15,
		});
	};

	const createDestinationFromSearchResult = async () => {
		await goto('/globe');
		addDestinationStore.update(s => ({
			...s,
			createFromSearchResult: true,
			active: true,
		}));
	};
</script>

{#if $searchStore.activeResult}
	<main>
		<DisplayCard>
			<div class="root group relative z-50 bg-black w-full rounded-lg">
				<!-- Buttons/Controls -->
				<div class="control-button absolute flex top-3 left-3 z-30">
					<button on:click={clearSearch}
						><img class="h-[15px] w-[15px]" src={closeIcon} /></button
					>
				</div>

				<div class="absolute right-3 top-3">
					<button alt="Fly to destination" on:click={handleFlyTo}>
						<img
							src={centerIcon}
							alt="Fly to destination"
							class="icon w-[24px] h-[24px]"
						/>
					</button>
				</div>
				<p class="text-stone-400 pb-3">Search Results:</p>
				<h1 class="text-2xl  bg-transparent font-semibold">
					{$searchStore.activeResult.place_name}
				</h1>

				<p class="my-4">{coordinates}</p>

				<ButtonPill handleClick={createDestinationFromSearchResult}
					>Create Destination</ButtonPill
				>
			</div>
		</DisplayCard>
	</main>
{/if}

<style lang="scss">
	@mixin barberpole-background {
		background: repeating-linear-gradient(120deg, #000, #000 11px, #222 11px, #222 12px);
		background-size: 200%;
		overflow: hidden;
		display: block;
	}

	main {
		position: relative;
		max-height: calc(100vh - 80px);
		overflow: auto;
		width: auto;
		align-self: flex-start;
		display: flex;
		flex-flow: column nowrap;
	}

	button {
		@apply grid place-items-center h-[50px] w-[50px] rounded-full hover:bg-gray-800;
	}

	.root {
		@apply p-[40px] pt-[64px] border-stone-600 overflow-hidden rounded-lg;
		@include barberpole-background;

		&:hover {
			animation: barberpole 20s linear infinite;
		}
	}
</style>
