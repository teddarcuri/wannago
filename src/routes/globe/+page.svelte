<script>
	import { page } from '$app/stores';
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import GettingStarted from './components/GettingStarted.svelte';
	$: addDestinationMarker = $addDestinationStore.marker;
</script>

<svelte:head>
	<title>Globe</title>
</svelte:head>

{#if $page.data.session && !addDestinationMarker}
	<!-- <GettingStarted /> -->
{/if}
