<script>
	import DisplayCard from '$lib/components/DisplayCard.svelte';
</script>

<!-- <button class="absolute top-2 left-[235px]">?</button> -->
<!-- <DisplayCard> -->
<div class="mb-4">
	<!-- <h1 class="text-xl font-semibold mb-7"><span>👋</span>Welcome to Wannago</h1>
	<h3 class="text-lg font-semibold my-7"><span>🏔️</span> Create a Destination</h3>
	<p><span class="text-xl">👆</span> Double click to add a destination</p>
	<p><span class="text-xl">🫳</span> Drag and drop the marker to reposition</p>
	<h3 class="text-lg font-semibold my-7"><span>🌍</span> Control the Globe</h3>
	<p><span class="text-xl">👆</span> Click the ' ' button to toggle rotation</p>
	<p><span class="text-xl">🌏</span> `Ctrl` + mouse -> tilt and rotate globe</p>
	<p><span class="text-xl">🌍</span> `Shift` + mouse -> center camera on area</p>

	<br />
	<button>Got it. Dismiss for now.</button> -->

	<h1 class="text-xl font-semibold mb-7"><span>👋</span>Welcome to Wannago</h1>
	<p>Use the Globe to create a map of <b>your</b> world.</p>
	<br />
	<p>Add and browse destinations using the tools in the top right corner</p>
	<p>Camera controls below</p>
</div>

<!-- </DisplayCard> -->
<style>
	p {
		@apply ml-2;
	}

	button {
		/* width: 20px;
		height: 20px; */
		display: block;
	}

	div {
		z-index: 1;
		position: relative;
		@apply bg-black p-8 opacity-90 rounded-lg;
	}

	span {
		@apply mr-4;
		font-size: 28px;
	}
</style>
