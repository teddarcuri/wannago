<script>
	import { page } from '$app/stores';
	import Account from './auth/Account.svelte';
	import Auth from './auth/Auth.svelte';
</script>

<svelte:head>
	<title>Wannago</title>
	<meta name="description" content="We live in a beautiful World. Document yours." />
</svelte:head>

{#if !$page.data.session}
	<Auth />
{:else}
	<Account session={$page.data.session} />
{/if}
