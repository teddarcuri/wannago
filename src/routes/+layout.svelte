<script>
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import dashboard from '$lib/img/dashboard.svg';
	import '../app.css';

	$: pathname = $page.url.pathname;
	$: isRoot = pathname === '/';
	$: navLink = isRoot ? '/globe' : '/';
	$: navText = isRoot ? 'Back to Globe' : 'Dashboard';

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
			<a
				class="
				  duration-999 flex items-center 
                  text-xs uppercase tracking-widest 
                  opacity-60 transition-all ease-in-out 
				  px-3
                  hover:ml-[-7px]
                  hover:opacity-80"
				href={navLink}
			>
				<img class="mr-3" src={dashboard} width="15px" heihgt="15px" />
				{navText}
			</a>
		</nav>
	</header>
	<div id="app-body">
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
