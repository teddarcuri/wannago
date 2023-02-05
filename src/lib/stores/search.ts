import { writable } from 'svelte/store';

type MapboxPlaceApiResult = {
	type: string;
	query: string[];
	features: object[];
};

export const searchStore = writable({
	activeResult: null,
	data: null as MapboxPlaceApiResult | null,
	marker: null,
	history: [],
	activeHistory: null,
});
