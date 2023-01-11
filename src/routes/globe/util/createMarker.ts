import createWaypointCanvas from '@/lib/util/createWaypointCanvas';
import type { Map } from 'mapbox-gl';
import { Marker } from 'mapbox-gl';

export enum MarkerType {
	destination,
	activeDestination,
	newDestination,
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
		background.classList.add('blue');
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

	if (name) {
		// name bubble
		var bubble = document.createElement('div');
		bubble.classList.add('name-bubble');
		bubble.innerText = name;
		wrapper.append(bubble);
	}

	return new Marker({ element: wrapper, draggable }).setLngLat([lng, lat]).addTo(map);
}
