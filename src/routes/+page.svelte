<script>
	import { page } from '$app/stores';
	import Account from './auth/Account.svelte';
	import Auth from './auth/Auth.svelte';
</script>

<svelte:head>
	<title>Wannago</title>
	<meta name="description" content="We live in a beautiful World. Document yours." />
</svelte:head>

<main>
	<div>
		<header>
			<h1>🌎 Welcome to Wannago</h1>
			<h3>We live in a beautiful World. Document yours.</h3>
		</header>
		{#if !$page.data.session}
			<Auth />
		{:else}
			<Account session={$page.data.session} />
		{/if}
	</div>
</main>

<style>
	main {
		@apply bg-black
		absolute top-0 left-0
		w-full h-full
		opacity-90
		grid place-items-center
		z-50;
	}

	header {
		@apply mb-12;
	}

	h1 {
		@apply text-3xl py-6;
		align-self: flex-start;
	}

	h3 {
		@apply text-xl;
	}
</style>
