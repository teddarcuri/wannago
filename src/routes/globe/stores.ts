import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Marker } from 'mapbox-gl';

//
// Active Info Display
//
export enum ActiveInfoDisplayStatus {
	Normal,
	Action,
	Success,
	Error
}

export interface ActiveInfoDisplayStore {
	status: ActiveInfoDisplayStatus;
	displayText: string;
}

export const activeInfoDisplayStore: Writable<ActiveInfoDisplayStore> = writable({
	status: ActiveInfoDisplayStatus.Normal,
	displayText: 'Document your World.'
});

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
