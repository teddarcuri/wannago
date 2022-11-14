<script>
	import DisplayCard from './components/DisplayCard.svelte';
	import Auth from '@routes/auth/Auth.svelte';
	import { page } from '$app/stores';
</script>

<DisplayCard>
	{#if $page.data.session}
		<div>
			<h1 class="text-xl font-semibold mb-7"><span>👋</span>Welcome to Wannago</h1>
			<h3 class="text-lg font-semibold my-7"><span>🏔️</span> Create a Destination</h3>
			<p><span class="text-xl">👆</span> Double click to add a destination</p>
			<p><span class="text-xl">🫳</span> Drag and drop the marker to reposition</p>
			<h3 class="text-lg font-semibold my-7"><span>🌍</span> Control the Globe</h3>
			<p><span class="text-xl">👆</span> Click the ' ' button to toggle rotation</p>
			<p><span class="text-xl">🌏</span> `Ctrl` + mouse -> tilt and rotate globe</p>
			<p><span class="text-xl">🌍</span> `Shift` + mouse -> center camera on area</p>

			<br />
			<button>Got it. Dismiss for now.</button>
		</div>
	{/if}

	{#if !$page.data.session}
		<Auth />
	{/if}
</DisplayCard>

<style>
	p {
		@apply ml-2;
	}

	div {
		@apply bg-gray-900 p-8 opacity-90;
	}

	span {
		@apply mr-4;
	}
</style>
