<script>
	import { fly } from 'svelte/transition';
</script>

<div
	class="root"
	transition:fly={{
		duration: 400,
		x: 50,
		y: 0,
	}}
>
	<slot />
</div>

<style>
	.root {
		@apply bg-stone-900 bg-opacity-90 rounded-lg;
		position: absolute;
		top: 55px;
		left: -42px;
		width: 280px;
		max-height: calc(100vh - 220px);
		overflow: auto;
	}
</style>
