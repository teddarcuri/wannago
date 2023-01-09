<script lang="ts">
	import { each } from 'svelte/internal';
	import { fade } from 'svelte/transition';
	import CoverPhoto from './CoverPhoto.svelte';
	$: coverPhoto = $$props.data.destination.cover_photo;

	$: backLink = `/globe/destinations/${$$props.data.destination.id}`;
</script>

<div
	class=" bg fixed pointer-events-none bg-black top-0 left-0 opacity-40 w-full h-full"
/>
<div class="sidebar">
	<a href={backLink}>&#8592</a>
	<button>+</button>
</div>
<main in:fade={{ delay: 222, duration: 222 }}>
	<CoverPhoto {coverPhoto} />
</main>

<style lang="scss">
	main {
		padding: 20px 20px 50px 100px;
	}

	.sidebar {
		@apply absolute left-0 top-[60px] flex flex-col;

		button,
		a {
			@apply bg-black w-[55px] h-[55px] rounded-md mb-4 grid place-items-center
			text-xl;

			&:hover {
				@apply bg-gray-800;
			}
		}
	}
</style>
