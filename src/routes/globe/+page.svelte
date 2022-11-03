<script lang="ts">
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	onMount(async () => {
		const module = await import('mapbox-gl/dist/mapbox-gl.js');
		const mapboxgl = module.default;

		mapboxgl.accessToken = env.PUBLIC_MAPBOX_ACCESS_TOKEN;

		const map = new mapboxgl.Map({
			container: 'mapbox-mount',
			style: 'mapbox://styles/mapbox/satellite-v9',
			projection: 'globe'
		});
	});
</script>

<div id="mapbox-mount" />

<style>
	#mapbox-mount {
		width: 100%;
		height: 100%;
	}
</style>
