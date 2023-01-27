<script>
	import { searchStore } from '@/lib/stores/search';
	import { onDestroy } from 'svelte';
	import createMarker, { MarkerType } from '../util/createMarker';

	export let map;
	let marker;

	$: if ($searchStore.activeResult) {
		const lat = $searchStore.activeResult.center[1];
		const lng = $searchStore.activeResult.center[0];
		marker = createMarker({
			name: $searchStore.activeResult.place_name,
			map,
			lat,
			lng,
			markerType: MarkerType.search,
		});
		searchStore.update(s => ({ ...s, marker }));
	} else {
		if (marker) marker.remove();
		searchStore.update(s => ({ ...s, marker: null }));
	}

	onDestroy(() => {
		if (marker) marker.remove();
	});
</script>

<style global lang="scss">
	.search-result {
		@apply h-[66px] w-[66px] flex items-center justify-center;

		img {
			opacity: 1;
		}
	}
</style>
