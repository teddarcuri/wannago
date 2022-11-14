import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

//
// Active Destination
//
export interface ActiveDestinationStore {
	marker: Marker | null;
	destination?: object;
}

export const activeDestinationStore: Writable<ActiveDestinationStore> = writable({
	marker: null,
	destination: null
});
