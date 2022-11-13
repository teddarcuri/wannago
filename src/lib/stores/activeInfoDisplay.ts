import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

//
// Active Info Display
//
export enum ActiveInfoDisplayStatus {
	Normal,
	Action,
	Success,
	Error
}

export interface ActiveInfoDisplayStore {
	status: ActiveInfoDisplayStatus;
	displayText: string;
}

export const activeInfoDisplayStore: Writable<ActiveInfoDisplayStore> = writable({
	status: ActiveInfoDisplayStatus.Normal,
	displayText: 'Document your World.'
});
