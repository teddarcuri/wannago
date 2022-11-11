<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<form class="bg-black h-full grid place-items-center" on:submit|preventDefault={handleLogin}>
	<div class="col-6 form-widget border-2 border-gray-800 p-10">
		<h1 class="text-3xl pb-1">We live in a beautiful World.</h1>
		<h3 class="text-2xl pb-6">Document Yours.</h3>
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
      text-zinc-600
        border-zinc-600
        bg-gray-800
        text-zinc-200
        hover:bg-emerald-800
        active:bg-zinc-900"
			value={loading ? 'Loading' : 'Send magic link'}
			disabled={loading}
		/>
	</div>
</form>
