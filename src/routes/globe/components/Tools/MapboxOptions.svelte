<script lang="ts">
	import { Mapstyle } from '../../util/bootstrapMapbox';
	import outdoors from '$lib/features/mapbox/styles/outdoors.png';
	import satellite from '$lib/features/mapbox/styles/satellite.png';
	import light from '$lib/features/mapbox/styles/light.png';
	import dark from '$lib/features/mapbox/styles/dark.png';
	import natural from '$lib/features/mapbox/styles/natural.png';
	import streets from '$lib/features/mapbox/styles/streets.png';

	export let map;

	const getImage = style => {
		if (style === Mapstyle.Outdoors) return outdoors;
		if (style === Mapstyle.Dark) return dark;
		if (style === Mapstyle.Light) return light;
		if (style === Mapstyle.Earth) return satellite;
		if (style === Mapstyle.Streets) return streets;
		if (style === Mapstyle.Minimal) return natural;
	};

	$: console.log(map.getStyle());

	// TODO: Figure out how to get active style
</script>

<div>
	{#each Object.keys(Mapstyle) as key}
		<button class:active={false} on:click={() => map.setStyle(Mapstyle[key])}>
			<img src={getImage(Mapstyle[key])} />
			<p>{key}</p></button
		>
	{/each}
</div>

<style lang="scss">
	.active {
		// @apply border-y border-stone-900;
		img {
			@apply mr-5 opacity-100;
			transform: scale(1.6);
		}
	}

	div {
		@apply flex flex-col;
	}

	button {
		@apply relative text-left text-lg text-stone-600
		flex align-middle h-[44px] items-center
		overflow-hidden
		  bg-black border-transparent 
			hover:bg-zinc-800
			hover:text-white;
		transition: all 0.1s ease-out;

		img {
			@apply w-[35px] h-full mr-4 opacity-50;

			transition: all 0.12s ease-out;
		}

		&:hover,
		&:nth-child(2) {
			@apply border-y border-stone-500 text-stone-100 text-xl;
			img {
				@apply mr-5 opacity-100;
				transform: scale(1.6);
			}
		}
	}
</style>
