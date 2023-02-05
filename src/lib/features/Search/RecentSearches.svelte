<script>
	import { searchStore } from '@/lib/stores/search';
</script>

<div class="bg-white bg-opacity-5 p-2 py-4">
	<h4 class="text-stone-400 p-2 text-sm">Recent Searches</h4>
	{#each $searchStore.history as history}
		<button
			on:click={() =>
				searchStore.update(s => ({
					...s,
					activeHistory: history,
				}))}
			class="p-2 m-1 rounded-md bg-black text-xs opacity-50 hover:opacity-100"
		>
			<span>{history.searchQuery}</span>
		</button>
	{/each}
</div>
