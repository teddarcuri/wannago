<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabaseClient } from '$lib/db';

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
				alert(error.message);
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
				updated_at: new Date()
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

<div class="col-span-4 grid place-items-center">
	<form
		class="p-9 bg-gray-900 w-full 
			rounded-lg 
			border-gray-800 border-4
			text-sm
			"
		on:submit|preventDefault={updateProfile}
	>
		<label for="email">Email</label>
		<input id="email" type="text" value={session.user.email} disabled />

		<label for="username">Name</label>
		<input id="username" type="text" bind:value={username} />

		<button type="submit" disabled={loading}>
			{loading ? '...' : 'Update'}
		</button>
	</form>

	<div>
		<button
			class="absolute bg-sky-900 right-[20px] bottom-[20px]"
			on:click={signOut}
			disabled={loading}>Log Me Out</button
		>
	</div>
</div>
