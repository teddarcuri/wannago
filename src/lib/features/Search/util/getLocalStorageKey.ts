import { SEARCH_HISTORY_LOCAL_STORAGE_KEY } from '../constants';
import { get } from 'svelte/store';
import auth from '$lib/stores/auth';

const getSearchResultsLocalStorageKey = () => {
	const userId = get(auth).user?.id;
	return `${SEARCH_HISTORY_LOCAL_STORAGE_KEY}-uuid:${userId}`;
};

export default getSearchResultsLocalStorageKey;
