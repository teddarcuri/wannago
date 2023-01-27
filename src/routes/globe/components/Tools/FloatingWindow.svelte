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
		@apply bg-black rounded-lg;
		position: fixed;
		top: 88px;
		right: 10px;
		width: 333px;
		max-height: calc(100vh - 195px);
		overflow: auto;
		/* background: repeating-linear-gradient(120deg, #000, #000 11px, #222 11px, #222 12px);
		background-size: 200%;
		animation: barberpole 20s linear infinite; */
	}

	@media (max-width: 800px) {
		.root {
			width: 100%;
			max-height: calc(100vh - 80px);
			top: 70px;
			right: 0;
			left: 0;
			/* bottom: 0; */
			border-radius: 0;
		}
	}
</style>
