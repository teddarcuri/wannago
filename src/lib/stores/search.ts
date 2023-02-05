import { writable } from 'svelte/store';
import { SEARCH_HISTORY_LOCAL_STORAGE_KEY } from '$lib/features/Search/constants';

type MapboxPlaceApiResult = {
	type: string;
	query: string[];
	features: object[];
};

const getHistory = () => {
	let history = [];
	// if localstorage exists, get search history from there and convert into javascript otherwise return empty array
	if (typeof localStorage !== 'undefined') {
		history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY) || '[]');
	}
	return history;
};

export const searchStore = writable({
	activeResult: null,
	data: null as MapboxPlaceApiResult | null,
	marker: null,
	history: getHistory(),
	activeHistory: null,
});
