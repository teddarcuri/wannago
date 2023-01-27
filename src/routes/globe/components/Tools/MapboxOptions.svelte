<script lang="ts">
	import { Mapstyle } from '../../util/bootstrapMapbox';
	import outdoors from '$lib/features/mapbox/styles/outdoors.png';
	import satellite from '$lib/features/mapbox/styles/satellite.png';
	import light from '$lib/features/mapbox/styles/light.png';
	import dark from '$lib/features/mapbox/styles/dark.png';
	import natural from '$lib/features/mapbox/styles/natural.png';
	import streets from '$lib/features/mapbox/styles/streets.png';
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';

	export let map;
	// fetch from mapbox api all styles
	const mapboxStyles = () => {
		fetch(
			`https://api.mapbox.com/styles/v1/mapbox?access_token=${PUBLIC_MAPBOX_ACCESS_TOKEN}`,
		)
			.then(res => res.json())
			.then(data => {
				console.log('MAPBOX STYLES: ', data);
			});
	};

	mapboxStyles();
	const getImage = style => {
		if (style === Mapstyle.Outdoors) return outdoors;
		if (style === Mapstyle.Dark) return dark;
		if (style === Mapstyle.Light) return light;
		if (style === Mapstyle.Earth) return satellite;
		if (style === Mapstyle.Streets) return streets;
		if (style === Mapstyle.Minimal) return natural;
	};

	const isActive = style => {
		let activeStyle = map.getStyle();

		console.log('ISSS ACTIVE STYLE: ', activeStyle.name, ' === ', style, ' ?');

		if (activeStyle.name === 'Mapbox Satellite') {
			return true;
		} else {
			return false;
		}
	};
</script>

<div>
	{#each Object.keys(Mapstyle) as key}
		{@const style = Mapstyle[key]}
		{@const active = isActive(style)}
		<button
			class:active
			on:click={() => {
				map.setStyle(style);
			}}
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
		@apply relative text-left text-lg text-stone-400
		flex align-middle h-[55px] items-center
		overflow-hidden
		  bg-black border-b-2 border-black 
			hover:bg-black
			hover:text-white;
		transition: all 0.1s ease-out;

		img {
			@apply w-[20px] h-full mr-4 opacity-50;

			transition: all 0.12s ease-out;
		}

		&:hover {
			@apply border-y border-stone-900 text-stone-100 text-lg;
			img {
				@apply mr-5 opacity-100;
				transform: scale(1.6);
			}
		}
	}

	.active {
		@apply border-y border-b-2 border-b-stone-700;
		img {
			@apply mr-5 opacity-100;
			transform: scale(1.6);
		}
	}
</style>
