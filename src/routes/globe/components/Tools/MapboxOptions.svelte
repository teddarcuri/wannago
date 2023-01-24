<script lang="ts">
	import { Mapstyle } from '../../util/bootstrapMapbox';
	import outdoors from '$lib/features/mapbox/styles/outdoors.png';
	import satellite from '$lib/features/mapbox/styles/satellite.png';
	import light from '$lib/features/mapbox/styles/light.png';
	import dark from '$lib/features/mapbox/styles/dark.png';

	export let map;

	const getImage = style => {
		if (style === Mapstyle.Outdoors) return outdoors;
		if (style === Mapstyle.Dark) return dark;
		if (style === Mapstyle.Light) return light;
		if (style === Mapstyle.Earth) return satellite;
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
		@apply relative text-left 
		flex align-middle items-center
		p-3 border-b bg-black border-stone-800 hover:bg-zinc-800;

		img {
			@apply rounded-md w-[33px] h-[33px] mr-4;
		}
	}
</style>
