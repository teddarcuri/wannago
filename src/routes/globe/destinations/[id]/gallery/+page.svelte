<script lang="ts">
	import { each } from 'svelte/internal';
	import CoverPhoto from './CoverPhoto.svelte';
	$: coverPhoto = $$props.data.destination.cover_photo;

	const gallery = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
</script>

<div class="fixed pointer-events-none bg-black top-0 left-0 opacity-50 w-full h-full" />
<main>
	<CoverPhoto {coverPhoto} />
	<!-- <div class="w-full mt-8 h-[9000px]"> -->
	<!-- 	{#each gallery as photo} -->
	<!-- 		<div class="bg-white h-[200px] w-[200px]" /> -->
	<!-- 	{/each} -->
	<!-- </div> -->
</main>

<style lang="scss">
	main {
		padding: 50px 20px;
	}
</style>
