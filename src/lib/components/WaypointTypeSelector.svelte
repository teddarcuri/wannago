<script lang="ts">
	import { onMount } from 'svelte';
	import { addWaypointStore } from '../stores/addWaypoint';
	import createWaypointCanvas from '../util/createWaypointCanvas';
	import colors from '$lib/features/waypoints/colors';

	export let waypointName: string = '';

	const updateColor = color => {
		$addWaypointStore.color = color;
	};

	onMount(() => {
		$addWaypointStore.color = colors[0];
	});

	$: {
		colors.forEach(color => {
			const label = waypointName.charAt(0);
			color.canvas = createWaypointCanvas(label, color.hex, 20);
		});
	}
</script>

<div class="root group">
	{#if $addWaypointStore.color?.canvas}
		<div class="flex ">
			<img
				class="m-0 mt-1 ml-3 h-[30px] w-[30px]"
				src={$addWaypointStore.color.canvas.toDataURL()}
			/>
			<span class="text-md ml-3 group-hover:opacity-60 opacity-30">&#9662;</span>
		</div>
		<!-- spacer -->
		<div class="py-4 w-full absolute bottom-0 -mb-8" />
		<ul class="dropdown">
			{#each colors as color}
				<li
					class:active={color.name === $addWaypointStore.color.name}
					on:click={() => updateColor(color)}
				>
					<button on:click|preventDefault>
						{#if color?.canvas}
							<img src={color.canvas.toDataURL()} />
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.root {
		@apply relative w-[80px] h-[55px] mr-4 
		flex flex-col pr-3
		border border-transparent
		rounded-lg
		justify-center items-center;
		flex: 1 0 auto;

		&:hover {
			@apply border-stone-700 rounded-2xl cursor-pointer;

			.dropdown {
				@apply opacity-100 visible;
			}
		}
	}

	.dropdown {
		@apply absolute top-[100%] w-[60px] 
		left-1/2 -translate-x-1/2 
		mt-4
		overflow-hidden
		p-0 m-0 h-auto bg-stone-800 rounded-md;
		visibility: hidden;

		li {
			@apply m-0 p-0 w-full;

			&.active {
				@apply bg-stone-700;
			}
		}

		button {
			@apply p-3 flex justify-center items-center
			m-0 w-full
			hover:bg-stone-900;

			img {
				@apply rounded-full h-[20px] w-[20px];
			}
		}
	}
</style>
