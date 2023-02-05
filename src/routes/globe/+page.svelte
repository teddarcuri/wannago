<script>
	// 👋 🌏 🏔️
	import GlobePageLayout from './_globePageLayout.svelte';
	import SearchResultCard from '@/lib/features/Search/SearchResultCard.svelte';
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import { searchStore } from '@/lib/stores/search';
</script>

<svelte:head>
	<title>Globe</title>
</svelte:head>

<GlobePageLayout>
	{#if $searchStore.activeResult && !$addDestinationStore.active}
		<SearchResultCard />
	{/if}
	<slot />
</GlobePageLayout>
