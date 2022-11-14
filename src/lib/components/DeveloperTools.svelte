<script lang="ts">
	import { page } from '$app/stores';
	import { userDestinationsStore } from '$lib/stores/userDestinations';

	$: session = $page.data.session;
	$: storeDump = JSON.stringify($userDestinationsStore);
</script>

<pre
	class="absolute top-0 right-0 p-7 text-sm overflow-auto w-[500px] opacity-90  h-full bg-gray-900">
	{JSON.stringify(session, null, 2)}
	<hr />
	<!-- {storeDump} -->
</pre>
