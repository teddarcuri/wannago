import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

export interface ActiveDestinationStore {
	marker: Marker | null;
	destination?: object;
	editLocationMode: boolean;
	newLocation: array | null; // This is used to track the update marker location feature
}

export const activeDestinationStore: Writable<ActiveDestinationStore> = writable({
	marker: null,
	destination: null,
	editLocationMode: false,
	newLocation: null,
});
