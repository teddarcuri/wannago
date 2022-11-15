<script lang="ts">
	import { page } from '$app/stores';
	import { userDestinationsStore } from '$lib/stores/userDestinations';

	$: session = $page.data.session;
	$: storeDump = JSON.stringify($userDestinationsStore, null, 2);
</script>

<pre
	class="absolute top-0 right-0 p-7 text-xs overflow-auto w-[500px] opacity-90  h-full bg-gray-900">
	<h4>Session</h4>
	{JSON.stringify(session, null, 2)}
	<h4>User Destinations</h4>
	{storeDump}
</pre>

<style>
	h4 {
		@apply bg-gray-800 p-4;
		font-size: 15px;
		font-weight: bold;
	}
</style>
