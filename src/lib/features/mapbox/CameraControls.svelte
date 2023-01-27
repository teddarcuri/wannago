<script>
	import Rotate from '$lib/img/rotate.svg';
	import RotateLeft from '$lib/img/rotate-left.svg';
	import TiltUp from '$lib/img/tilt-up.svg';
	import TiltDown from '$lib/img/tilt-down.svg';
	import Coordinates from '$lib/img/coordinates.svg';
	import CameraGlobe from '$lib/img/camera-globe.svg';
	import RotatingGlobe from '$lib/img/rotating-globe.svg';
	import North from '$lib/img/north.svg';
	import Plus from '$lib/img/plus.svg';
	import Subtract from '$lib/img/subtract.svg';
	import Sattelite from '$lib/img/sattelite.svg';

	import { getContext } from 'svelte';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	const { getMap } = getContext('map');
	const map = getMap();

	function handleRotateRight() {
		const bearing = map.getBearing();

		map.rotateTo(bearing + 45, { duration: 1000 });
	}

	function handleRotateLeft() {
		const bearing = map.getBearing();

		map.rotateTo(bearing - 45, { duration: 1000 });
	}

	// flyToSpace function that get coordinates of active destination and flies to it
	function flyToSpace() {
		const [lng, lat] = $activeDestinationStore.destination.coordinates.coordinates;
		map.flyTo({
			center: [lng, lat],
			zoom: 4,
		});
	}
</script>

<div>
	<button title="Zoom In" class="text-3xl font-bold" on:click={() => map.zoomIn()}
		><img src={Plus} /></button
	>

	<button title="Zoom Out" class="text-3xl font-bold" on:click={() => map.zoomOut({})}
		><img src={Subtract} /></button
	>

	<button title="Rotate Right" on:click={handleRotateLeft}><img src={Rotate} /></button>

	<button title="Rotate Left" on:click={handleRotateRight}
		><img src={RotateLeft} /></button
	>

	<button
		title="Tilt Down"
		on:click={() =>
			map.easeTo({
				pitch: map.getPitch() + 20,
			})}><img src={TiltDown} /></button
	>

	<button
		title="Tilt Up"
		on:click={() =>
			map.easeTo({
				pitch: map.getPitch() - 20,
			})}><img src={TiltUp} /></button
	>

	<button title="Orient North" on:click={() => map.resetNorth({ duration: 2000 })}
		><img src={North} /></button
	>

	<button title="Fly to Space" on:click={() => flyToSpace()}
		><img src={Sattelite} /></button
	>

	<!-- <button class="toggle"><img src={CameraGlobe} /></button> -->
</div>

<style lang="scss">
	div {
		@apply fixed flex right-[11px] bottom-[30px] flex items-center 
		p-3 py-1 
        bg-black bg-opacity-50 rounded-full
			hover:bg-opacity-100;
		z-index: 200;
		// transform: translateX(-50%);
	}

	button {
		@apply rounded-full grid place-items-center
		 h-[44px] w-[44px];

		transition: all 0.2s ease-in-out;

		&:hover {
			img {
				@apply h-[33px] w-[33px] opacity-100;
			}
		}

		&:last-child {
			@apply mr-0;
		}

		img {
			@apply h-[25px] w-[25px] opacity-90;
			transition: all 0.2s ease-in-out;
			filter: drop-shadow(2px 2px 0px rgb(0 0 0 / 1));
		}

		&.toggle {
			@apply bg-black border-2 border-emerald-800 
			absolute right-0 h-[70px] w-[70px] bg-opacity-100;
			// box-shadow: 0px 0px 11px 5px rgba(255, 255, 255, 0.1);

			img {
				@apply h-[36px] w-[36px] opacity-100;
			}
		}
	}
</style>
