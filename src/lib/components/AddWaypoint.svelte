<script>
	import { addWaypointStore } from '../stores/addWaypoint';
	import { fade } from 'svelte/transition';

	let waypointName;

	let loading = false;

	const handleSubmit = () => {
		// addWaypointStore.update(s => ({
		//     active: false,
		//     coordinates: null,
		// }));
	};

	const handleCancel = () => {
		addWaypointStore.update(s => ({
			active: false,
			coordinates: null,
		}));
	};
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="w-full h-full justify-center align-center items-center relative flex flex-row"
>
	{#if loading}
		<div
			class="loading absolute flex items-center justify-center bg-black top-0 left-0 w-full h-full text-4xl text-stone-200"
		>
			<img src={spinner} />
			<p>Creating Destination</p>
		</div>
	{/if}

	{#if $addWaypointStore.coordinates}
		<input in:fade placeholder="Enter Waypoint Name" bind:this={waypointName} />
	{:else}
		<h3 in:fade>Click anywhere on map to add new waypoint</h3>
	{/if}

	<div class="buttons">
		{#if $addWaypointStore.coordinates}
			<button class="create" type="submit">Create</button>
		{/if}
		<button class="cancel" in:fade on:click={handleCancel}>Cancel</button>
	</div>
</form>

<style lang="scss">
	.root {
		--angle: -50deg;
		background-image: linear-gradient(var(--angle), #2b3441, #3a4554);
	}

	h3 {
		@apply text-xl text-stone-500;
	}

	.loading {
		img {
			height: 44px;
			width: 44px;
			margin-right: 12px;
			transform: rotate(var(--angle));
			animation: 1s rotate ease-in-out infinite;
		}
	}

	.buttons {
		@apply ml-4;
	}

	button {
		@apply h-[33px] uppercase rounded-md px-4
			  text-zinc-600
			  tracking-widest text-xs
			  font-semibold
				hover:border-zinc-600
				hover:bg-gray-800
				hover:text-zinc-200
				active:bg-zinc-900;

		&.create {
			@apply bg-emerald-900 text-stone-300;

			&:hover {
				@apply bg-emerald-700;
			}
		}

		&.cancel {
			@apply bg-stone-800 text-stone-300 ml-2;

			&:hover {
				@apply bg-stone-600;
			}
		}
	}

	input {
		@apply text-2xl
		bg-transparent
		py-3
		text-white
		border-b
		border-solid
		border-transparent
		focus:outline-none
		placeholder-gray-500
		active:bg-transparent;

		&::placeholder {
			@apply text-stone-600;
		}

		&:focus {
			// @apply border-stone-600;
		}
	}
</style>
