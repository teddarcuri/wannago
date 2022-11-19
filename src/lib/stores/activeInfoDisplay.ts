import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export enum ActiveInfoDisplayStatus {
	Normal,
	Action,
	Success,
	Error,
	Information,
	Loading
}

export interface ActiveInfoDisplayStore {
	status: ActiveInfoDisplayStatus;
	displayText: string;
}

export const activeInfoDisplayStore: Writable<ActiveInfoDisplayStore> = writable({
	status: ActiveInfoDisplayStatus.Normal,
	displayText: 'Document your World.'
});
