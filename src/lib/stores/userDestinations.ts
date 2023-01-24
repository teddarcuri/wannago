import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// interface Geometry {
//     point: {},
//     coordinates: []
// }

// interface Destination {
//     name: string,
//     coordinates
// }

// interface UserDestinationsStore {
//     destinations: []
// }

export const userDestinationsStore = writable({
	destinations: [],
	destinationTypes: [],
});
