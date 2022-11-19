import { goto } from '$app/navigation';
import type { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import searchIcon from '$lib/img/search-icon.svg';
import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import { type AddDestinationStore, addDestinationStore } from '$lib/stores/addDestination';
import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '$lib/stores/activeInfoDisplay';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import addIcon from '$lib/img/add-icon.svg';
import createMarker, { MarkerType } from './createMarker';
import rotateGlobe from './rotateGlobe';
import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';

let activeInfoDisplayStatus: ActiveInfoDisplayStatus | undefined;
activeInfoDisplayStore.subscribe((d) => {
	activeInfoDisplayStatus = d.status;
});

let addDestination: AddDestinationStore | undefined;
addDestinationStore.subscribe((d) => (addDestination = d));

enum Mapstyle {
	Satellite = 'mapbox://styles/mapbox/satellite-v9',
	Outdoors = 'mapbox://styles/mapbox/outdoors-v11',
	Labels = 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
}

export default async (): Promise<Map> => {
	/*
		wannago uses MapboxGL JS to render out a 3D globe
		https://docs.mapbox.com/mapbox-gl-js/api/
	*/
	const module = await import('mapbox-gl/dist/mapbox-gl.js');
	const mapboxgl = module.default;
	mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;

	const map: Map = new mapboxgl.Map({
		container: 'mapbox-mount',
		style: Mapstyle.Labels,
		projection: 'globe',
		zoom: 3.666,
		bearing: 0,
		center: [-99.94373365867199, 43.495094628394924],
		pitch: 60
	});

	// Controls
	if (false) {
		map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
				marker: {
					element: (() => {
						// Add marker
						var wrapper = document.createElement('div');
						wrapper.classList.add('mapboxgl-marker-wrapper');
						var inner = document.createElement('div');
						inner.classList.add('mapboxgl-marker-inner');
						var background = document.createElement('div');
						background.classList.add('mapboxgl-marker-background');
						var gimg = document.createElement('img');
						gimg.src = searchIcon;
						inner.append(gimg);
						wrapper.append(inner);
						wrapper.append(background);
						return wrapper;
					})()
				}
			})
		);
	}

	// Lifecycle
	map.on('load', () => {
		// disable zoom on double click
		// dbl click is used to add a destination
		map.doubleClickZoom.disable();
		// Rotate the globe
		rotateGlobe(map);
	});

	map.on('render', () => {
		// Add Destination set screen coordinates
		if (addDestination?.marker) {
			addDestinationStore.update((s) => ({
				...s,
				screenPos: s.marker?._pos
			}));
		}
	});

	map.on('styledata', () => {
		// create DEM source
		// https://en.wikipedia.org/wiki/Digital_elevation_model
		map.addSource('mapbox-dem', {
			type: 'raster-dem',
			url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
			tileSize: 512,
			maxzoom: 14
		});
		// Set Terrain
		map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.69 });

		// Draw Atmosphere on render
		map.on('render', () => {
			//
			// Update atmosphere
			// Show sky when user is low enough
			const HORIZON_BLEND_LOW = 0.0333;
			const HORIZON_BLEND_HIGH = 1;
			const fog = map.getFog();
			const zoom = map.getZoom();
			// If the user is zoomed in enough, set the fog to ressemble an atmosphere
			if (zoom < 5.5) {
				if (fog?.['horizon-blend'] !== HORIZON_BLEND_LOW) {
					map.setFog({
						color: 'rgba(186, 210, 235, 1)', // Lower atmosphere
						'high-color': 'rgba(36, 92, 223, 1)', // Upper atmosphere
						'horizon-blend': HORIZON_BLEND_LOW, // Atmosphere thickness (default 0.2 at low zooms)
						'space-color': 'rgb(0, 0, 0)', // Background color
						'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
					});
				}
			} else {
				// If the user is zoomed out enough, set the fog to ressemble space
				if (fog?.['horizon-blend'] !== HORIZON_BLEND_HIGH) {
					map.setFog({
						color: 'rgba(186, 210, 235, 1)', // Lower atmosphere
						'high-color': 'rgba(36, 92, 223, 1)', // Upper atmosphere
						'horizon-blend': HORIZON_BLEND_HIGH, // Atmosphere thickness (default 0.2 at low zooms)
						'space-color': 'rgb(0, 0, 0)', // Background color
						'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
					});
				}
			}
		});
	});

	map.on('dblclick', (e) => {
		goto('/globe');
		const lowZoom = 12;
		const currentZoom = map.getZoom();
		const cameraIsLow = currentZoom < lowZoom;
		const { lngLat } = e;
		const { lat, lng } = lngLat;

		// Remove old marker if exist
		if (addDestination?.marker) addDestination.marker.remove();

		// Show user they are adding a destination
		activeInfoDisplayStore.update(() => ({
			status: ActiveInfoDisplayStatus.Information,
			displayText: "What's here?"
		}));

		// // Fly to destination
		map.flyTo({
			zoom: cameraIsLow ? lowZoom : currentZoom,
			center: [lng, lat],
			pitch: map.getPitch() + 5,
			speed: cameraIsLow ? 1 : 0.666,
			curve: 1,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});

		// Add marker
		const marker = createMarker({
			markerType: MarkerType.newDestination,
			map,
			icon: addIcon,
			lat,
			lng,
			draggable: true
		});

		// Add marker to addDestination store
		addDestinationStore.update((s) => ({
			...s,
			marker
		}));
	});

	map.on('mousemove', (e) => {
		// Get Lat, Lng for ActiveInfoDisplay
		if (activeInfoDisplayStatus === ActiveInfoDisplayStatus.Normal) {
			const { lngLat } = e;
			const lat = `${Math.abs(lngLat.lat.toFixed(3))}° ${lngLat.lat > 0 ? 'N' : 'S'}`;
			const lng = `${Math.abs(lngLat.lng.toFixed(3))}° ${lngLat.lng > 0 ? 'E' : 'W'}`;
			const displayText = getLatLngDisplayText(lngLat.lat, lngLat.lng);
			activeInfoDisplayStore.update(() => ({
				status: ActiveInfoDisplayStatus.Normal,
				displayText
			}));
		}
	});

	return map;
};
