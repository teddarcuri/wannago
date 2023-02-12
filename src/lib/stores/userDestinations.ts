import { writable } from 'svelte/store';

const initialState = {
	destinations: [],
	destinationTypes: [],
	hasFetched: false, // using this to check if we have fetched the data from the server - may want to reconsider later
};

export const resetUserDestinationStore = store => {
	store.set(initialState);
};

export const userDestinationsStore = writable({
	...initialState,
});

export default userDestinationsStore;
