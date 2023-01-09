<script>
	import MyDestinations from '@/lib/components/Dashboard/MyDestinations.svelte';
	import { fly } from 'svelte/transition';
</script>

<div
	class="root"
	transition:fly={{
		duration: 500,
		x: 50,
		y: 0,
	}}
>
	<MyDestinations />
</div>

<style>
	.root {
		@apply bg-stone-900 bg-opacity-90 rounded-md;
		position: absolute;
		top: 0;
		left: 70px;
		width: 280px;
		max-height: 600px;
		overflow: auto;
	}
</style>
