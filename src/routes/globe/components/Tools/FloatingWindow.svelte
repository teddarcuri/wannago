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
	}

	@media (max-width: 420px) {
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
