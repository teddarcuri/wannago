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
			projection: 'globe',
			zoom: 3.333,
			bearing: 0,
			center: [-99.94373365867199, 43.495094628394924],
			pitch: 60
		});

		map.on('load', () => {
			// create DEM source
			// https://en.wikipedia.org/wiki/Digital_elevation_model
			map.addSource('mapbox-dem', {
				type: 'raster-dem',
				url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
				tileSize: 512,
				maxzoom: 14
			});
			// DEM source -> terrain layer
			map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.666 });
			// A little fog to set the mood
			map.setFog({
				color: 'rgba(186, 210, 235, 0.15)', // Lower atmosphere
				'high-color': 'rgba(36, 92, 223, 0.15)', // Upper atmosphere
				'horizon-blend': 0.0333, // Atmosphere thickness (default 0.2 at low zooms)
				'space-color': 'rgb(0, 0, 0)', // Background color
				'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
			});
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
