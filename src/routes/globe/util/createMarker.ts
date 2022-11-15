import type { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';

export enum MarkerType {
	destination,
	activeDestination,
	newDestination
}

interface Options {
	markerType?: MarkerType;
	map: Map;
	name?: string;
	icon?: string;
	lat: number;
	lng: number;
	draggable?: boolean;
}

export default function ({
	markerType = MarkerType.destination,
	map,
	icon,
	lat,
	lng,
	name,
	draggable
}: Options): Marker {
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

	if (name) {
		// name bubble
		var bubble = document.createElement('div');
		bubble.classList.add('name-bubble');
		bubble.innerText = name;
		// wrapper.append(bubble);
	}

	// icon
	if (icon) {
		var img = document.createElement('img');
		img.src = icon;
		inner.append(img);
	}

	// append dat shiz
	wrapper.append(inner);
	wrapper.append(background);

	return new Marker({ element: wrapper, draggable }).setLngLat([lng, lat]).addTo(map);
}
