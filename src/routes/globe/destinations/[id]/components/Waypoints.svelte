<script>
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import createWaypointCanvas from '@/lib/util/createWaypointCanvas';
	import createMarker from '@/routes/globe/util/createMarker';

	const handleCreate = () => {
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Black,
			displayText: '',
		}));

		addWaypointStore.update(s => ({
			...s,
			active: true,
		}));
	};

	const handleSubmit = () => {
		const {
			coordinates: [lat, lng],
			name,
		} = $addWaypointStore;

		createMarker({ isWaypoint: true, lat, lng });

		// const marker = createMarker({
		// 	coordinates,
		// 	name,
		// 	canvas: createWaypointCanvas(),
		// });

		// marker.addTo($globeStore.map);

		// addWaypointStore.update(s => ({
		// 	...s,
		// 	active: false,
		// 	coordinates: null,
		// }));
	};

	const handleCancel = () => {
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Normal,
			displayText: '',
			hide: false,
		}));

		addWaypointStore.update(s => ({
			...s,
			active: false,
			coordinates: null,
		}));
	};

	$: active = $addWaypointStore.active;
</script>

<div class="root">
	{#if $addWaypointStore.active && false}
		<p>Creating Waypoint</p>
	{:else}
		<p>Waypoints</p>
	{/if}

	<button class:active on:click={active ? handleCancel : handleCreate}>+</button>
</div>

<!-- <div class="waypoints">
	<p><b>W</b></p>
	<p><b>D</b></p>
	<p><b>C</b></p>
</div> -->
<style lang="scss">
	.root {
		@apply flex justify-between bg-stone-800 p-5 py-3  z-50 relative;
	}

	.waypoints {
		background: rgba(0, 0, 0, 0.75);
		padding: 12px;

		p {
			margin: 6px;
			display: inline-grid;
			place-items: center;
			height: 30px;
			width: 30px;
			border-radius: 50%;
			background: linear-gradient(90deg, #730303, #ba1d1d);
		}

		b {
			color: #fff;
		}
	}

	input {
		background-color: none;
		outline: none;
	}

	p {
		@apply flex flex-col justify-center flex-grow text-stone-400 tracking-widest text-sm font-medium uppercase;
	}

	button {
		@apply bg-black h-[36px] w-[36px] text-2xl text-stone-400 rounded-md;
		transition: all 0.2s ease-in-out;
		&.active {
			@apply text-stone-200 bg-stone-900 rotate-45;
		}

		&:hover {
			@apply text-stone-200 bg-stone-900;
		}
	}
</style>
