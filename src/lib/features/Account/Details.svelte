<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	$: session = $page.data.session;

	let loading = false;
	let username: string | null = null;
	let website: string | null = null;
	let avatarUrl: string | null = null;

	// onMount(() => {
	// 	getProfile();
	// });

	// const getProfile = async () => {
	// 	try {
	// 		loading = true;
	// 		const { user } = session;

	// 		const { data, error, status } = await supabaseClient
	// 			.from('profiles')
	// 			.select(`username, website, avatar_url`)
	// 			.eq('id', user.id)
	// 			.single();

	// 		if (data) {
	// 			username = data.username;
	// 			website = data.website;
	// 			avatarUrl = data.avatar_url;
	// 		}

	// 		if (error && status !== 406) throw error;
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			console.log(error.message);
	// 		}
	// 	} finally {
	// 		loading = false;
	// 	}
	// };

	// async function updateProfile() {
	// 	try {
	// 		loading = true;
	// 		const { user } = session;

	// 		const updates = {
	// 			id: user.id,
	// 			username,
	// 			website,
	// 			avatar_url: avatarUrl,
	// 			updated_at: new Date(),
	// 		};

	// 		let { error } = await supabaseClient.from('profiles').upsert(updates);

	// 		if (error) throw error;
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			alert(error.message);
	// 		}
	// 	} finally {
	// 		loading = false;
	// 	}
	// }

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabaseClient.auth.signOut();
			if (error) throw error;
			await goto('/welcome');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex mt-8 rounded-md justify-end" in:fly={{ delay: 669, duration: 1000 }}>
	<button
		class="text-sm rounded-md hover:bg-opacity-10 opacity-60 p-4 hover:bg-white"
		on:click={signOut}
		disabled={loading}>Log Out</button
	>
</div>
