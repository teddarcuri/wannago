import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import addMarker from '$lib/img/add-marker.svg';
import { activeInfoDisplay, addDestination } from '../stores.ts';
import rotateGlobe from './rotateGlobe';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// TODO: Typescriptify

export default async () => {
	const module = await import('mapbox-gl/dist/mapbox-gl.js');
	const mapboxgl = module.default;
	mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;
	const map = new mapboxgl.Map({
		container: 'mapbox-mount',
		style: 'mapbox://styles/mapbox/satellite-v9',
		projection: 'globe',
		zoom: 3.666,
		bearing: 0,
		center: [-99.94373365867199, 43.495094628394924],
		pitch: 60
	});

	// Controls
	map.addControl(
		new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		})
	);

	// Lifecycle
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
			color: 'rgba(186, 210, 235, 1)', // Lower atmosphere
			'high-color': 'rgba(36, 92, 223, 1)', // Upper atmosphere
			'horizon-blend': 0.0333, // Atmosphere thickness (default 0.2 at low zooms)
			'space-color': 'rgb(0, 0, 0)', // Background color
			'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
		});

		rotateGlobe(map);
	});

	// Events

	map.on('dblclick', (e) => {
		const {
			lngLat: { lat, lng }
		} = e;
		console.log(e);
		// const el = createMarkerCanvas('M', 'bada55');
		const el = document.createElement('img');
		el.src = addMarker;
		el.style.height = '50px';
		el.style.width = '50px';
		new mapboxgl.Marker({
			element: el
		})
			.setLngLat([lng, lat])
			.addTo(map);
		// addDestination.update((c) => ({
		// 	point
		// }));
	});

	map.on('mousemove', (e) => {
		const { lngLat } = e;
		const lat = `${Math.abs(lngLat.lat.toFixed(3))}° ${lngLat.lat > 0 ? 'N' : 'S'}`;
		const lng = `${Math.abs(lngLat.lng.toFixed(3))}° ${lngLat.lng > 0 ? 'E' : 'W'}`;
		const displayText = `${lat}, ${lng}`;
		activeInfoDisplay.update(() => ({ displayText }));
	});

	return map;
};
