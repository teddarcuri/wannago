import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface AddWaypointStore {
	active: boolean;
	parentDestinationId: string | null;
	marker: object | null;
	mousePos: { x: number; y: number } | null;
	coordinates: [number, number] | null;
	color: { name: string; hex: string; canvas?: HTMLCanvasElement } | '';
}

export const addWaypointStore: Writable<AddWaypointStore> = writable({
	active: false,
	parentDestinationId: null,
	marker: null,
	mousePos: null,
	color: '',
});
