import { writable } from 'svelte/store';
import { get } from 'svelte/store';
const initialState = {
	userProfile: null,
	user: null,
};

export const resetAuthStore = store => {
	store.set(initialState);
};

export const authStore = writable({
	...initialState,
});

export default authStore;
