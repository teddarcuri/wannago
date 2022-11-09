import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

//
// Active Info Display
//
enum ActiveInfoDisplayStatus {
	Normal,
	Success,
	Error
}

interface ActiveInfoDisplayStore {
	subscribe: Writable<number>['subscribe'];
	status: ActiveInfoDisplayStatus;
	displayText: string;
}

export const activeInfoDisplay: ActiveInfoDisplayStore = writable({
	status: ActiveInfoDisplayStatus.Normal,
	displayText: 'Document your World.'
});

//
// Add Destination
//
interface AddDestinationStore {
	subscribe: Writable<number>['subscribe'];
	point: [number, number];
	lngLat: {
		lng: number;
		lat: number;
	};
}

export const addDestination: AddDestinationStore = writable({
	point: null,
	screenCoordinates: null
});
