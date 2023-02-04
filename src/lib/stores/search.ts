import { writable } from 'svelte/store';

export const searchStore = writable({
	activeResult: null,
	results: [],
	marker: null,
	query: '',
	history: [],
});
