<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import type { Map } from 'mapbox-gl';
	import { onMount } from 'svelte';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import DestinationMarker from './DestinationMarker.svelte';

	export let map: Map;

	$: destinations = $userDestinationsStore.destinations;

	// async function loadData() {
	// 	const { error, data: destinations } = await supabaseClient.from('destinations')
	// 		.select(`
	//                id,
	//                name,
	//                coordinates,
	//                description,
	//                cover_photo (
	//                    id,
	//                    public_url,
	//                    bucket_path
	//                )
	//            `);
	//
	// 	if (error) return console.error(error);
	// 	userDestinationsStore.update(() => ({ destinations }));
	// }
	//
	// onMount(async () => await loadData());
</script>

{#each destinations as destination}
	<DestinationMarker {map} {destination} />
{/each}
