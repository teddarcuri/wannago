import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

export interface AddWaypointStore {
	active: boolean;
	parentDestinationId: string | null;
	marker: Marker | null;
	screenPos: { x: number; y: number } | null;
	coordinates: [number, number] | null;
}

export const addWaypointStore: Writable<AddWaypointStore> = writable({
	active: false,
	parentDestinationId: null,
	marker: null,
	screenPos: null,
});
