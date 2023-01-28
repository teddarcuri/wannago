import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

export interface AddDestinationStore {
	marker: Marker | null;
	destinationTypeId: number | null;
	createFromSearchResult: boolean;
	screenPos: { x: number; y: number } | null;
	active: boolean;
}

export const addDestinationStore: Writable<AddDestinationStore> = writable({
	marker: null,
	destinationTypeId: 0,
	createFromSearchResult: false,
	screenPos: null,
	active: false,
});
