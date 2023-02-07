<script lang="ts">
	import dashboard from '$lib/img/dashboard.svg';
	import { page } from '$app/stores';
	import { addWaypointStore } from '$lib/stores/addWaypoint';
	import { addDestinationStore } from '$lib/stores/addDestination';
	import { activeDestinationStore } from '$lib/stores/activeDestination';
	$: pathname = $page.url.pathname;
	$: isRoot = pathname === '/';
	$: navLink = isRoot ? '/globe' : '/';
	$: navText = isRoot ? 'Exit Dashboard' : 'Dashboard';
	$: session = $page.data.session;
	$: transparent = $activeDestinationStore.deleteMode || $addDestinationStore.active;
	$: logoLink = false ? '/globe' : '/';
</script>

<header class:transparent id="app-nav">
	<a href={logoLink}><div id="logo" class="mr-7">wannago</div></a>
	<nav>
		{#if !$addWaypointStore.active && !$addDestinationStore.active && !$activeDestinationStore.deleteMode && session}
			<a
				class:active={isRoot}
				class="
				dashboard-link
                duration-999 flex items-center 
                text-xs uppercase tracking-widest 
                opacity-50 transition-all ease-in-out 
                p-4
                hover:opacity-80"
				href={navLink}
			>
				<img class="mr-3" src={dashboard} width="15px" height="15px" />
				{navText}
			</a>
		{/if}
	</nav>
</header>

<style lang="scss">
	#logo {
		font-size: 23px;
		padding-left: 28px;
	}

	#app-nav {
		@apply bg-black;
		flex: 0 0 77px;
		display: flex;
		width: 100%;
		align-items: center;
		z-index: 999;

		&.transparent {
			@apply bg-transparent;
		}
	}

	nav a.active {
		@apply opacity-90;
		transform: scale(1.1);
	}

	button.sidebar {
		margin-left: auto;
		padding: 0 33px;
		height: 100%;
		opacity: 0.5;

		&:hover,
		&.active {
			background: #111;
			opacity: 1;
		}
	}

	// at the medium breakpoint, make the dashboard link go to the right
	@media (max-width: 768px) {
		.dashboard-link {
			display: none;
		}
		nav {
			// margin-left: auto;
			// padding-right: 24px;
		}
	}
</style>
