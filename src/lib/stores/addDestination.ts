import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface AddDestinationStore {
	marker: object | null;
	destinationTypeId: number;
	createFromSearchResult: boolean;
	screenPos: { x: number; y: number } | null;
	active: boolean;
}

export const addDestinationStore: Writable<AddDestinationStore> = writable({
	marker: null,
	destinationTypeId: 1,
	createFromSearchResult: false,
	screenPos: null,
	active: false,
});
