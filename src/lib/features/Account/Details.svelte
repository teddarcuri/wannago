<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { fly } from 'svelte/transition';
	import { goto, invalidateAll } from '$app/navigation';
	import {
		userDestinationsStore,
		resetUserDestinationStore,
	} from '$lib/stores/userDestinations';
	import { authStore, resetAuthStore } from '$lib/stores/auth';

	let loading = false;

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabaseClient.auth.signOut();
			if (error) throw error;
			await goto('/welcome');

			// resetUserDestinationStore(userDestinationsStore);
			// resetAuthStore(authStore);
			// not a fan of this, but the store restes above were not giving me the desired result
			// All I am trying to do is ensure a  clean state when the user logs out...
			invalidateAll();
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
