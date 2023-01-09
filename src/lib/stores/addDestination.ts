import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

export interface AddDestinationStore {
	marker: Marker | null;
	screenPos: { x: number; y: number } | null;
	active: boolean;
}

export const addDestinationStore: Writable<AddDestinationStore> = writable({
	marker: null,
	screenPos: null,
	active: false,
});
