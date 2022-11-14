<script>
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import DisplayCard from '../../components/DisplayCard.svelte';
	import focusIcon from '$lib/img/focus.svg';
	import closeIcon from '$lib/img/close.svg';
	export let data;

	$: destination = data.destination;
	$: lat = destination.coordinates.coordinates[1];
	$: lng = destination.coordinates.coordinates[0];
	$: console.log('DATA: ', destination);
</script>

<DisplayCard>
	<div class="bg-gray-900 p-6 opacity-90">
		<div class="absolute flex top-0 right-0 py-[6px] px-[12px]">
			<!-- <button href="/globe">
				<img src={focusIcon} />
			</button> -->
			<a href="/globe"><img src={closeIcon} /></a>
		</div>

		<h1 class="text-3xl font-semibold">{destination.name}</h1>
		{#if destination.coordinates}
			<p>
				{getLatLngDisplayText(lat, lng)}
			</p>
		{/if}
	</div>
</DisplayCard>

<style>
	a,
	button {
		@apply rounded-full flex align-middle items-center justify-center;
		height: 38px;
		width: 38px;
	}

	a:hover,
	button:hover {
		@apply bg-gray-800;
	}
	a img,
	button img {
		width: 12px;
		height: 12px;
	}
</style>
