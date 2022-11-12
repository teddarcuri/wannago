<script>
	import { page } from '$app/stores';
	import Account from './auth/Account.svelte';
	import Auth from './auth/Auth.svelte';
</script>

<svelte:head>
	<title>Supabase + SvelteKit</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

{#if !$page.data.session}
	<Auth />
{:else}
	<a href="/globe">Go to Globe</a>
	<Account session={$page.data.session} />
{/if}
