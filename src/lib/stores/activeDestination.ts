import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface ActiveDestinationStore {
	marker: object | null;
	destination?: object;
	editLocationMode: boolean;
	deleteMode: boolean;
	newLocation: array | null; // This is used to track the update marker location feature
}

export const activeDestinationStore: Writable<ActiveDestinationStore> = writable({
	marker: null,
	destination: null,
	editLocationMode: false,
	deleteMode: false,
	newLocation: null,
});
