import getSearchResultsLocalStorageKey from '$lib/features/Search/util/getLocalStorageKey';

export default function () {
	let history = [];
	if (typeof localStorage !== 'undefined') {
		const searchHistoryKey = getSearchResultsLocalStorageKey();
		history = JSON.parse(localStorage.getItem(searchHistoryKey) || '[]');
	}
	return history;
}
