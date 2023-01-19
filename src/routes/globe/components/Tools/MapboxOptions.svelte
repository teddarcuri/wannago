<script lang="ts">
	import { Mapstyle } from '../../util/bootstrapMapbox';

	export let map;
</script>

<div>
	{#each Object.keys(Mapstyle) as style}
		<button on:click={() => map.setStyle(Mapstyle[style])}>{style}</button>
	{/each}
</div>

<style>
	div {
		@apply flex flex-col;
	}

	button {
		@apply text-left p-3 border-b bg-black border-stone-800 hover:bg-zinc-800;
	}
</style>
