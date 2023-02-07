<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import Button from '$lib/components/Button.svelte';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';

	let loading = false;

	async function signInWithGoogle() {
		loading = true;

		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google',
		});

		loading = false;

		if (error) alert(error?.message ?? 'There was an issue logging you in');
	}
</script>

<div class="wrapper text-center">
	{#if loading}
		<LoadingOverlay />
	{/if}
	<header>
		<h1 class="text-3xl"><span class="mr-3">🌎</span> Welcome to Wannago</h1>
		<h3 class="text-xl mt-4 opacity-50">We live in a beautiful World. Document yours.</h3>
	</header>
	<form class="w-[440px] mt-6 grid place-items-center">
		<Button onClick={signInWithGoogle}>Sign in with Google</Button>
	</form>
</div>

<style>
	form {
		position: relative;
		padding: 3px;
		opacity: 0.9;
	}

	button {
		position: relative;
		z-index: 9;
	}

	.wrapper {
		/* width: 1248px;
		margin: 50px auto 0;
		padding: 0 40px; */
		position: relative;
	}

	.gradient {
		@apply absolute top-0 left-0
		w-full h-full;
		opacity: 0.4;
		z-index: 0;
		background-image: linear-gradient(
			120deg,
			#426eb5,
			#9db5dc,
			#7fb6ff,
			#2361b9,
			#0d3e84
		);
	}

	.inner {
		@apply w-full;
		background: rgba(5, 5, 5, 0.9);
		z-index: 9;
	}
</style>
