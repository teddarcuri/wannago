<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/db';
	import type { Map } from 'mapbox-gl';
	import { onMount } from 'svelte';
	import destination from '$lib/img/destination.svg';
	import addIcon from '$lib/img/add-icon.svg';
	import { userDestinationsStore } from '$lib/stores/userDestinations';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '$lib/stores/activeInfoDisplay';
	import createMarker from '../util/createMarker';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import rotateCameraAroundPoint from '../util/rotateCameraAroundPoint';

	export let map: Map;

	$: destinations = $userDestinationsStore.destinations;
	$: $userDestinationsStore.destinations, createDestinationMarkers();

	async function loadData() {
		const { error, data } = await supabaseClient.from('destinations').select();

		if (error) return console.error(error);

		userDestinationsStore.update((s) => ({
			destinations: data
		}));
	}

	const createDestinationMarkers = () => {
		destinations.forEach(({ name, coordinates }) => {
			const {
				coordinates: [lng, lat]
			} = coordinates;

			const marker = createMarker({ map, lat, lng, icon: destination });
			const domElement = marker.getElement();
			domElement.addEventListener('click', (e) => {
				goto(`/globe/destinations/${name}`);
				rotateCameraAroundPoint({ point: coordinates.coordinates, init: 0, map });
				domElement.classList.add('active-destination');
				// map.flyTo({
				// 	zoom: 14.555,
				// 	center: coordinates.coordinates,
				// 	pitch: 69,
				// 	speed: 1,
				// 	curve: 1
				// });
			});

			// TODO: COnsider a refactor
			// It might be good to simply have this apply/remove a class
			domElement.addEventListener('mouseenter', () => {
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Action,
					displayText: name
				}));
				const img = getMarkerImgChildNode(domElement);
				img.src = addIcon;
			});

			domElement.addEventListener('mouseleave', () => {
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Normal,
					displayText: ''
				}));
				const img = getMarkerImgChildNode(domElement);
				img.src = destination;
			});
		});
	};

	onMount(async () => await loadData());
</script>
