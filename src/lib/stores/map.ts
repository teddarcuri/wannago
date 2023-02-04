import { writable } from 'svelte/store';

export const mapStore = writable({
	activeStyle: null,
});
