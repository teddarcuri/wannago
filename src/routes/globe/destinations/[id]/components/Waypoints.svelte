<script>
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import createWaypointCanvas from '@/lib/util/createWaypointCanvas';
	import loadingIcon from '$lib/img/spinner.svg';

	export let waypoints;
	export let map;

	const handleFlyTo = waypoint => {
		const {
			coordinates: {
				coordinates: [lat, lng],
			},
		} = waypoint;
		const center = [lng, lat];
		map.flyTo({
			center,
			zoom: 15,
		});
	};

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
	console.log('LOADING ICON: ', loadingIcon);
</script>

<div class="root">
	<p>Waypoints</p>

	<button class:active on:click={active ? handleCancel : handleCreate}>+</button>
</div>

{#if waypoints}
	<div class="waypoints">
		{#each waypoints as waypoint}
			{@const canvas = createWaypointCanvas(waypoint.name.charAt(0), waypoint.hex)}
			<p on:click={() => handleFlyTo(waypoint)} class="list-item">
				<img src={canvas ? canvas.toDataURL() : loadingIcon} />
				<input value={waypoint.name} />
			</p>
		{/each}
	</div>
{/if}

<style lang="scss">
	.root {
		@apply flex overflow-hidden justify-between bg-stone-800 p-5 py-2 z-50 relative;

		p {
			@apply flex items-center flex-grow text-stone-400 tracking-widest text-sm font-medium uppercase;
		}

		button {
			@apply bg-black h-[40px] w-[40px] text-2xl text-stone-400 rounded-full;
			&.active {
				@apply text-stone-200 bg-stone-900 rotate-45;
			}

			&:hover {
				@apply text-stone-200 bg-stone-900;
			}
		}
	}

	img {
		// @apply p-2;
		transition: transform 0.2s ease-in-out;
		&:hover {
			@apply bg-stone-700 cursor-pointer rounded-md;
			transform: scale(1.1111);
		}
	}

	.waypoints {
		@apply z-50 mb-0 flex flex-col bg-black;
		position: relative;
		width: 100%;
		overflow-x: scroll;

		p.list-item {
			@apply flex items-center 
			border-solid border-stone-700 border-b
			text-base h-[45px]
			px-4;

			&:hover,
			&:has(input:focus) {
				@apply bg-stone-900 cursor-pointer;
			}
		}

		.list-item img {
			transform: scale(0.6);
		}

		b {
			color: #fff;
		}

		input {
			@apply bg-transparent text-stone-400 border-2
			border-transparent rounded-md w-full
			outline-none px-2 h-[80%];

			&:hover {
				@apply border-2 border-white border-opacity-30 bg-white
				bg-opacity-10;
			}
			&:focus {
				@apply text-stone-200 bg-stone-900;
			}
		}
	}
</style>
