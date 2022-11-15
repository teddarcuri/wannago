<script>
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import dashboard from '$lib/img/dashboard.svg';
	import Mapbox from '$lib/components/Mapbox.svelte';
	import NavigationManager from '@/lib/components/NavigationManager.svelte';
	import '../app.css';

	$: pathname = $page.url.pathname;
	$: isRoot = pathname === '/';
	$: navLink = isRoot ? '/globe' : '/';
	$: navText = isRoot ? 'View Globe' : 'Dashboard';
	$: session = $page.data.session;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div id="app-wrapper">
	<header id="app-nav">
		<div id="logo" class="mr-7">wannago</div>
		<nav>
			{#if session}
				<a
					class:active={isRoot}
					class="
					duration-999 flex items-center 
					text-xs uppercase tracking-widest 
					opacity-50 transition-all ease-in-out 
					p-4
					hover:opacity-80"
					href={navLink}
				>
					<img class="mr-3" src={dashboard} width="15px" heihgt="15px" />
					{navText}
				</a>
			{/if}
		</nav>
	</header>
	<div id="app-body">
		<NavigationManager />
		<Mapbox />
		<slot />
	</div>
</div>

<style>
	#app-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-flow: column;
		overflow: hidden;
	}

	#app-nav {
		flex: 0 0 70px;
		display: flex;
		align-items: center;
		background: black;
		z-index: 99;
	}

	nav a.active {
		@apply opacity-90;
		transform: scale(1.1);
	}

	#app-body {
		flex-grow: 1;
		position: relative;
	}

	#logo {
		font-size: 23px;
		padding-left: 28px;
	}
</style>
