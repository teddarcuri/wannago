<script lang="ts">
	import { page } from '$app/stores';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import { activeDestinationStore } from '../stores/activeDestination';
	$: session = $page.data.session;
	$: udDump = JSON.stringify($userDestinationsStore, null, 2);
	$: adDump = JSON.stringify($activeDestinationStore.destination, null, 2);

	let show = false;
</script>

<div class:active={show} class="absolute transition-all translate-x-[95%] top-0 right-0">
	<button on:click={() => (show = !show)} class="absolute left-0 -translate-x-[50px] top-10"
		>{show ? 'x' : '<'}</button
	>
	<pre class=" p-7 text-xs overflow-auto w-[500px] opacity-90  h-full bg-gray-900">
	<h4>Session</h4>
	{JSON.stringify(session, null, 2)}
	<h4>User Destinations</h4>
	{udDump}
	<h4>Active Destination</h4>
	{adDump}
</pre>
</div>

<style>
	.active {
		@apply translate-x-0;
	}
	h4 {
		@apply bg-gray-800 p-4;
		font-size: 15px;
		font-weight: bold;
	}
</style>
