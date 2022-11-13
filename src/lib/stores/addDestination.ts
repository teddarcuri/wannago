import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

//
// Add Destination
//
export interface AddDestinationStore {
	marker: Marker | null;
	screenPos: { x: number; y: number } | null;
}

export const addDestinationStore: Writable<AddDestinationStore> = writable({
	marker: null,
	screenPos: null
});
