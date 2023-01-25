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
		if (style === Mapstyle.Natural) return natural;
	};

	$: console.log(map.getStyle());

	// TODO: Figure out how to get active style
</script>

<div>
	{#each Object.keys(Mapstyle) as key}
		<button on:click={() => map.setStyle(Mapstyle[key])}>
			<img src={getImage(Mapstyle[key])} />
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
		flex align-middle h-[60px] items-center
		p-3 border-b bg-black border-stone-800 
			hover:bg-zinc-800
			hover:text-white;
		transition: all 0.1s ease-out;

		img {
			@apply rounded-full w-[30px] h-[30px] mr-4 ml-1;

			transition: all 0.12s ease-out;
		}

		&:hover {
			img {
				@apply mr-5;

				transform: scale(1.3);
			}
		}
	}
</style>
