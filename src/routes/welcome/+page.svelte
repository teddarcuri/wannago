<script>
	import LoginForm from '@/lib/features/Account/LoginForm.svelte';
</script>

<!-- <main>
	<div
		class="flex rounded-md overflow-hidden bg-black bg-opacity-50 w-full max-w-[805px] h-[405px]"
	>
		<LoginForm />
		<div class="w-[300px] p-8 bg-stone-800">
			<h4>Create Destinations</h4>
			<h4>Upload photos</h4>
			<h4>Discover new places</h4>
		</div>
	</div>
</main> -->

<main>
	<LoginForm />
</main>
<div class="bg" />

<style lang="scss">
	main {
		@apply fixed top-1/2 left-1/2 
        z-10 grid place-items-center
        -translate-x-1/2 -translate-y-1/2;
	}

	.bg {
		@apply bg-black opacity-80
		fixed top-0 left-0
		w-full h-full
        pointer-events-none
		z-0;
	}
</style>
