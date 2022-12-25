import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface GlobalUIStore {
	sidebarActive: boolean;
}

export const globalUIStore: Writable<GlobalUIStore> = writable({
	sidebarActive: false,
});
