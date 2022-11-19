import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

export interface ActiveDestinationStore {
	marker: Marker | null;
	destination?: object;
	formValues?: object; // hopefully this changes in the future
}

export const activeDestinationStore: Writable<ActiveDestinationStore> = writable({
	marker: null,
	destination: null,
	formValues: null
});
