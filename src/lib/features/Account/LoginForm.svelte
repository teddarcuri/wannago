<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import Button from '$lib/components/Button.svelte';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	import GoogleLogo from '$lib/img/google.svg';
	import iconStrip from '$lib/img/icon-strip-nobg.svg';

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
		<h1 class="text-3xl select-none pointer-events-none">
			<span class="mr-4 text-3xl">🌎</span>Welcome to Wannago
		</h1>
		<!-- <img class="opacity-70 my-2 w-[333px] mx-auto" src={iconStrip} /> -->

		<h3 class="text-xl mt-4 opacity-50 select-none pointer-events-none">
			We live in a beautiful World. Document yours.
		</h3>
	</header>
	<form class="w-[440px] mt-6 select-none">
		<Button onClick={signInWithGoogle}>
			<img class="opacity-60" width="20px" src={GoogleLogo} />
			<span class="ml-4">Sign in with Google</span></Button
		>
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
