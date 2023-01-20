import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export enum ActiveInfoDisplayStatus {
	Normal,
	Action,
	Success,
	Error,
	Information,
	Loading,
	Black,
}

export interface ActiveInfoDisplayStore {
	status: ActiveInfoDisplayStatus;
	displayText: string;
	hide?: boolean;
}

export const activeInfoDisplayStore: Writable<ActiveInfoDisplayStore> = writable({
	status: ActiveInfoDisplayStatus.Normal,
	displayText: 'Document your World.',
	hide: false,
});
