<script lang="ts">
	import CoverPhoto from './CoverPhoto.svelte';
	$: coverPhoto = $$props.data.destination.cover_photo;
</script>

<div class="fixed pointer-events-none bg-black top-0 left-0 opacity-50 w-full h-full" />
<main>
	<CoverPhoto {coverPhoto} />
</main>

<style lang="scss">
	main {
		padding: 50px 20px;
	}

	main :global(section) {
		@apply bg-black w-[90%] max-w-[777px] h-[420px]
        grid place-items-center rounded-lg;
		padding: 20px;
	}
</style>
