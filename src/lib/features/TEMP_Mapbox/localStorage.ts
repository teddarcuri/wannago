import { Mapstyle } from '@routes/globe/util/bootstrapMapbox';
import { get } from 'svelte/store';
import authStore from '$lib/stores/auth';

export const MAPBOX_STYLE_LOCAL_STORAGE_KEY = 'mapboxStyle';

export const getLocalStorageKey = () => {
	const userId = get(authStore).user?.id;
	if (!userId) return '';
	return `${MAPBOX_STYLE_LOCAL_STORAGE_KEY}-uuid:${userId}`;
};

export const getMapStyleFromLocalStorage = (): Mapstyle => {
	if (!localStorage) return Mapstyle.Earth;
	if (!get(authStore).user) return Mapstyle.Earth;

	const mapStyle = localStorage.getItem(getLocalStorageKey());
	if (mapStyle) {
		return mapStyle as Mapstyle;
	}

	return Mapstyle.Earth;
};
