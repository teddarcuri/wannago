<script>
	import LoginForm from '@/lib/features/Account/LoginForm.svelte';
</script>

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
