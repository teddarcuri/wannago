<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import type { Map } from 'mapbox-gl';
	import { onMount } from 'svelte';
	import createMarker from '../util/createMarker';
	import destination from '$lib/img/destination.svg';
	import { goto } from '$app/navigation';
	import getMarkerImgChildNode from '../util/getMarkerImgChildNode';
	import addIcon from '$lib/img/add-icon.svg';
	export let map: Map;

	async function loadData() {
		const { error, data } = await supabaseClient.from('destinations').select();

		if (error) return console.error(error);

		data.forEach(({ name, coordinates }) => {
			const {
				coordinates: [lng, lat]
			} = coordinates;

			const marker = createMarker({ map, lat, lng, icon: destination });
			const domElement = marker.getElement();
			domElement.addEventListener('click', (e) => {
				goto(`/globe/destinations/${name}`);
				map.flyTo({
					zoom: 13,
					center: coordinates.coordinates,
					pitch: 69,
					speed: 1,
					curve: 1
				});
			});

			// TODO: COnsider a refactor
			// It might be good to simply have this apply/remove a class
			domElement.addEventListener('mouseenter', () => {
				const img = getMarkerImgChildNode(domElement);
				img.src = addIcon;
			});

			domElement.addEventListener('mouseleave', () => {
				const img = getMarkerImgChildNode(domElement);
				img.src = destination;
			});
		});
	}

	onMount(async () => await loadData());
</script>
