<script lang="ts">
	import { each } from 'svelte/internal';
	import { fade } from 'svelte/transition';
	import CoverPhoto from './CoverPhoto.svelte';
	$: coverPhoto = $$props.data.destination.cover_photo;
	let shapes = [];

	for (let i = 0; i < 20; i++) {
		shapes.push({
			width: Math.floor(Math.random() * (200 - 100 + 1) + 100),
			height: Math.floor(Math.random() * (200 - 100 + 1) + 100),
			color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
				Math.random() * 256,
			)}, ${Math.floor(Math.random() * 256)})`,
		});
	}

	$: backLink = `/globe/destinations/${$$props.data.destination.id}`;
</script>

<div
	class=" bg fixed pointer-events-none bg-black top-0 left-0 opacity-40 w-full h-full"
/>
<div class="sidebar">
	<a href={backLink}>&#8592</a>
	<!-- <button>+</button> -->
</div>
<main in:fade={{ delay: 222, duration: 222 }}>
	<CoverPhoto {coverPhoto} />

	<!-- {#each shapes as shape}
		<div
			class="shape"
			style="width: {shape.width}px; height: {shape.height}px; background-color: {shape.color};"
		/>
	{/each} -->
</main>

<style lang="scss">
	main {
		padding: 0px 20px 50px 80px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: 20px;
	}

	.sidebar {
		@apply absolute left-0 top-[34px] flex flex-col;

		button,
		a {
			@apply bg-black w-[55px] h-[55px] rounded-full mb-4 grid place-items-center
			text-xl;

			&:hover {
				@apply bg-gray-800;
			}
		}
	}

	.shape {
	}
</style>
