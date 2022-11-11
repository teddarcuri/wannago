<script lang="ts">
	import { onMount } from 'svelte';
	import ActiveInfoDisplay from './components/ActiveInfoDisplay.svelte';
	import AddDestination from './components/AddDestination.svelte';
	import bootstrapMapbox from './util/bootstrapMapbox';

	onMount(async () => await bootstrapMapbox());
</script>

<div id="mapbox-mount" />
<ActiveInfoDisplay />
<AddDestination />

<style>
	#mapbox-mount {
		width: 100%;
		height: 100%;
	}
</style>
