<script lang="ts">
	import { Mapstyle } from '../../util/bootstrapMapbox';
	import outdoors from '$lib/features/mapbox/styles/outdoors.png';
	import satellite from '$lib/features/mapbox/styles/satellite.png';
	import light from '$lib/features/mapbox/styles/light.png';
	import dark from '$lib/features/mapbox/styles/dark.png';
	import natural from '$lib/features/mapbox/styles/natural.png';
	import streets from '$lib/features/mapbox/styles/streets.png';
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
	import { mapStore } from '$lib/stores/map';
	import { getLocalStorageKey } from '$lib/features/Mapbox/localStorage.ts';

	export let map;
	$: activeStyle = getActiveStyle($mapStore.activeStyle);

	function getActiveStyle(style) {
		if (style === 'Mapbox Outdoors') {
			return Mapstyle.Topographic;
		} else if (style === 'Mapbox Navigation Preview Night') {
			return Mapstyle.Dark;
		} else if (style === 'Mapbox Navigation Preview Day') {
			return Mapstyle.Light;
		} else if (style === 'Mapbox Satellite') {
			return Mapstyle.Earth;
		} else if (style === 'Mapbox Satellite Streets') {
			return Mapstyle.Streets;
		} else if (style === '3D Terrain Satellite') {
			return Mapstyle.Natural;
		} else {
			return Mapstyle.Earth;
		}
	}

	const handleStyleChange = style => {
		map.setStyle(style);
		setStyleInLocalStorage(style);
	};

	const getImage = style => {
		if (style === Mapstyle.Topographic) return outdoors;
		if (style === Mapstyle.Dark) return dark;
		if (style === Mapstyle.Light) return light;
		if (style === Mapstyle.Earth) return satellite;
		if (style === Mapstyle.Streets) return streets;
		if (style === Mapstyle.Natural) return natural;
	};

	const setStyleInLocalStorage = style => {
		const key = getLocalStorageKey();
		localStorage.setItem(key, style);
	};
</script>

<div>
	{#each Object.keys(Mapstyle) as key}
		{@const style = Mapstyle[key]}
		<button
			class:active={activeStyle === style}
			on:click={() => handleStyleChange(style)}
		>
			<img src={getImage(style)} />
			<p>{key}</p></button
		>
	{/each}
</div>

<style lang="scss">
	div {
		@apply flex flex-col;
	}

	button {
		@apply relative text-left text-base text-stone-400
		flex align-middle h-[44px] items-center
		overflow-hidden
		  bg-black border-y border-stone-900 
			hover:bg-black
			hover:text-white;
		transition: all 0.1s ease-out;

		img {
			@apply w-[12px] h-full mr-4 opacity-50;

			transition: all 0.12s ease-out;
		}

		&:hover {
			@apply border-stone-700 text-stone-100 text-lg;
			img {
				@apply mr-5 opacity-100;
			}
		}
	}

	.active {
		@apply text-white bg-stone-900 border-stone-800;
		img {
			@apply mr-5 opacity-100 w-[24px];
			transform: scale(1.1);
		}
	}
</style>
