<script lang="ts">
	import { onMount } from 'svelte';
	import ActiveInfoDisplay from './ActiveInfoDisplay.svelte';
	import bootstrapMapbox from './util/bootstrapMapbox';

	onMount(async () => await bootstrapMapbox());
</script>

<div id="mapbox-mount" />
<ActiveInfoDisplay />

<style>
	#mapbox-mount {
		width: 100%;
		height: 100%;
	}
</style>
