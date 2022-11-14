<script>
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import DisplayCard from '../../components/DisplayCard.svelte';
	export let data;

	$: destination = data.destination;
	$: lat = destination.coordinates.coordinates[1];
	$: lng = destination.coordinates.coordinates[0];
</script>

<DisplayCard>
	<a class="absolute top-2 right-5" href="/globe">x</a>
	<h1 class="text-3xl font-semibold">{destination.name}</h1>
	{#if destination.coordinates}
		<p>
			{getLatLngDisplayText(lat, lng)}
		</p>
	{/if}
</DisplayCard>
