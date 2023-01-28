<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabaseClient } from '$lib/db';
	import { fly } from 'svelte/transition';

	export let session: AuthSession;

	let loading = false;
	let username: string | null = null;
	let website: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			const { data, error, status } = await supabaseClient
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (data) {
				username = data.username;
				website = data.website;
				avatarUrl = data.avatar_url;
			}

			if (error && status !== 406) throw error;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		} finally {
			loading = false;
		}
	};

	async function updateProfile() {
		try {
			loading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url: avatarUrl,
				updated_at: new Date(),
			};

			let { error } = await supabaseClient.from('profiles').upsert(updates);

			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabaseClient.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="mt-8 rounded-md bg-black p-4" in:fly={{ delay: 669, duration: 1000 }}>
	<!-- <h1 class="text-xl pb-4">My Account</h1> -->
	<!-- <form
		class="w-full relative
			z-50 p-[30px]
			bg-[#070708] rounded-md
			 text-sm
			"
		on:submit|preventDefault={updateProfile}
	>
		<div class="gradient" />
		<div class="z-10 relative">
			<h3 class="text-xl mb-2 opacity-50">Account Details</h3>
			<label for="email">Email: </label>
			<span class="text-lg mx-2">{session.user.email}</span>
			<br />
			<label for="username">Name: </label>
			<input disabled id="username" type="text" bind:value={username} />

			<button class="bg-sky-900" type="submit" disabled={loading}>
				{loading ? '...' : 'Update'}
			</button>
		</div>
	</form>

	<div>
		<button
			class="absolute text-sm bg-sky-900 right-[20px] z-50 bottom-[20px] p-4 rounded-md"
			on:click={signOut}
			disabled={loading}>Log Out</button
		>
	</div> -->
	<button
		class="
			text-sm bg-sky-900 
			right-[20px] z-50 
			bottom-[20px] p-4 rounded-md
			hover:bg-sky-700
		"
		on:click={signOut}
		disabled={loading}>Log Out</button
	>
</div>

<style>
	div {
		@apply text-zinc-300;
	}

	input {
		@apply text-zinc-300 inline-flex  text-lg border-0 w-auto px-2;
	}
	h1 {
		@apply text-2xl;
		opacity: 0.5;
	}

	.gradient {
		background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.74), rgba(0, 0, 0, 0.165));
		height: 100%;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 0;
	}
</style>
