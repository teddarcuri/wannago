import { get } from 'svelte/store';
import mapboxgl from 'mapbox-gl';
import createWaypointCanvas from '@/lib/features/Waypoints/utils/createWaypointCanvas';
import { userDestinationsStore } from '@/lib/stores/userDestinations';
import searchIcon from '$lib/img/search.svg';

const { Map, Marker } = mapboxgl;

export enum MarkerType {
	destination,
	activeDestination,
	newDestination,
	search,
}

interface Options {
	markerType?: MarkerType;
	map: Map;
	name?: string;
	icon?: string;
	lat: number;
	lng: number;
	fontSize?: number;
	draggable?: boolean;
	isWaypoint?: boolean;
	color: string;
}

export default function ({
	markerType = MarkerType.destination,
	map,
	icon,
	lat,
	lng,
	name,
	color = '222222',
	fontSize,
	draggable,
	isWaypoint,
}: Options): Marker {
	if (isWaypoint) {
		const element = document.createElement('div');
		element.classList.add('waypoint-marker');
		const img = createWaypointCanvas(name, color, fontSize);
		element.append(img);
		if (name) {
			// name bubble
			var bubble = document.createElement('div');
			bubble.classList.add('name-bubble');
			bubble.innerText = name;
			element.append(bubble);
		}

		return new Marker({ element, draggable }).setLngLat([lng, lat]).addTo(map);
	}

	// Outer wrapper
	var wrapper = document.createElement('div');
	wrapper.classList.add('mapboxgl-marker-wrapper');
	// inner layer
	var inner = document.createElement('div');
	inner.classList.add('mapboxgl-marker-inner');
	// "gradient" layer
	var background = document.createElement('div');
	background.classList.add('mapboxgl-marker-background');

	if (markerType === MarkerType.destination) {
		background.classList.add('destination');
	}

	if (markerType === MarkerType.activeDestination) {
		background.classList.add('active-destination');
	}

	if (markerType === MarkerType.newDestination) {
		wrapper.classList.add('add-destination');
	}

	if (markerType === MarkerType.search) {
		icon = searchIcon;
		wrapper.classList.add('search-result');
	}

	// icon
	if (icon) {
		var img = document.createElement('img');
		img.src = icon;

		// Set Icon offsets - some icons don't sit perfectly in the middle
		// Ski
		if (
			icon ===
			get(userDestinationsStore).destinationTypes.find(t => t.name === 'ski')?.icon
		) {
			img.style.marginTop = '5px';
			img.style.marginLeft = '-4px';
		}

		inner.append(img);
	}

	// append dat shiz
	wrapper.append(inner);
	wrapper.append(background);

	if (name) {
		// name bubble
		var bubble = document.createElement('div');
		bubble.classList.add('name-bubble');
		bubble.innerText = name;
		wrapper.append(bubble);
	}

	return new Marker({ element: wrapper, draggable }).setLngLat([lng, lat]).addTo(map);
}
