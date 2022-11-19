<script lang="ts">
	import { supabaseClient } from '$lib/db';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		// try {
		// 	loading = true;
		// 	const { error } = await supabaseClient.auth.signInWithOtp({ email });
		// 	if (error) throw error;
		// 	alert('Check your email for the login link!');
		// } catch (error) {
		// 	if (error instanceof Error) {
		// 		alert(error.message);
		// 	}
		// } finally {
		// 	loading = false;
		// }
	};

	async function signInWithGoogle() {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google'
		});
	}
</script>

<div class="wrapper">
	<header>
		<h1 class="text-3xl">🌎 Welcome to Wannago</h1>
		<h3 class="text-xl mt-4">We live in a beautiful World. Document yours.</h3>
	</header>
	<form class=" mt-6 w-[440px] grid place-items-center" on:submit|preventDefault={handleLogin}>
		<button on:click={signInWithGoogle}>SIgn in with GOogle bitch</button>

		<!-- <div class="gradient" /> -->
		<!-- <div class="inner p-10">
			<p class="py-4">Sign in via magic link with your email below</p>
			<input
				class="
			  mb-5 border-b-2 
			  border-zinc-500
			  bg-transparent
			  py-3
			  w-full
			  text-xl
			  text-white
			  focus:outline-none
			  active:bg-transparent
			"
				type="email"
				placeholder="Your email"
				bind:value={email}
			/>
			<input
				type="submit"
				class="   
			h-[44px]
			self-end
			rounded-md
			px-6
			cursor-pointer
		  text-zinc-600
			border-zinc-600
			bg-gray-800
			text-zinc-200
			hover:bg-sky-800
			active:bg-zinc-900"
				value={loading ? 'Loading' : 'Send magic link'}
				disabled={loading}
			/>
		</div> -->
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
		width: 1248px;
		margin: 50px auto 0;
		padding: 0 40px;
		position: relative;
	}

	.gradient {
		@apply absolute top-0 left-0
		w-full h-full;
		opacity: 0.4;
		z-index: 0;
		background-image: linear-gradient(120deg, #426eb5, #9db5dc, #7fb6ff, #2361b9, #0d3e84);
	}

	.inner {
		@apply w-full;
		background: rgba(5, 5, 5, 0.9);
		z-index: 9;
	}
</style>
