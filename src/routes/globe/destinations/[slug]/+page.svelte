<script>
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import DisplayCard from '../../components/DisplayCard.svelte';
	import focusIcon from '$lib/img/focus.svg';
	import closeIcon from '$lib/img/close.svg';
	export let data;

	$: destination = data.destination;
	$: lat = destination.coordinates.coordinates[1];
	$: lng = destination.coordinates.coordinates[0];
</script>

<DisplayCard>
	{#if destination}
		<div class="bg-gray-900 h-full p-8 pt-10 rounded-lg opacity-90">
			<!-- <img
			class="cover"
			src="https://uxjcnbzonuzmknqsevlh.supabase.co/storage/v1/object/sign/wallpapers/WhereToWeekend__HERO_Moab_shutterstock_383798869.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3YWxscGFwZXJzL1doZXJlVG9XZWVrZW5kX19IRVJPX01vYWJfc2h1dHRlcnN0b2NrXzM4Mzc5ODg2OS53ZWJwIiwiaWF0IjoxNjY4NDEyMzM2LCJleHAiOjE5ODM3NzIzMzZ9.nlZVuJjojYpI2vsJkcItW0W471LD1Z0tCFp-k5NEZos"
		/> -->
			<div class="absolute flex top-0 right-0">
				<!-- <button href="/globe">
				<img src={focusIcon} />
			</button> -->
				<a href="/globe"><img src={closeIcon} /></a>
			</div>

			<section>
				<h1 class="text-3xl font-semibold">{destination.name}</h1>
				{#if destination.coordinates}
					<p>
						{getLatLngDisplayText(lat, lng)}
					</p>
				{/if}
			</section>
		</div>
	{/if}
</DisplayCard>

<style>
	a,
	button {
		@apply rounded-full flex align-middle items-center justify-center;
		height: 38px;
		width: 38px;
	}

	.cover {
		@apply absolute opacity-40 top-0 left-0 z-0 object-cover;
	}

	a:hover,
	button:hover {
		@apply bg-gray-800;
	}
	a img,
	button img {
		width: 9px;
		height: 9px;
	}

	section {
		@apply bg-slate-900 relative z-20;
	}
</style>
