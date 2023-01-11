<script lang="ts">
	import dashboard from '$lib/img/dashboard.svg';
	import sidebar from '$lib/img/sidebar.svg';
	import { page } from '$app/stores';
	import { globalUIStore } from '../stores/globalUI';
	import { addWaypointStore } from '../stores/addWaypoint';
	import { addDestinationStore } from '../stores/addDestination';
	import { activeDestinationStore } from '../stores/activeDestination';
	$: pathname = $page.url.pathname;
	$: isRoot = pathname === '/';
	$: navLink = isRoot ? '/globe' : '/';
	$: navText = isRoot ? 'View Globe' : 'Dashboard';
	$: session = $page.data.session;
	$: sidebarActive = $globalUIStore.sidebarActive;
	$: transparent = $activeDestinationStore.deleteMode;
</script>

<header class:transparent id="app-nav">
	<div id="logo" class="mr-7">wannago</div>
	<nav>
		{#if !$addWaypointStore.active && !$addDestinationStore.marker && session}
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
				<img class="mr-3" src={dashboard} width="15px" height="15px" />
				{navText}
			</a>
		{/if}
	</nav>
	<!-- {#if !$addWaypointStore.active && !$addDestinationStore.marker}
		<button
			on:click={() => {
				$globalUIStore.sidebarActive = !$globalUIStore.sidebarActive;
			}}
			class:active={sidebarActive}
			class="sidebar"><img width="15px" height="15px" src={sidebar} /></button
		>
	{/if} -->
</header>

<style lang="scss">
	#logo {
		font-size: 23px;
		padding-left: 28px;
	}

	#app-nav {
		@apply bg-black;
		flex: 0 0 70px;
		display: flex;
		width: 100%;
		align-items: center;
		z-index: 99;

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
		nav {
			margin-left: auto;
			padding-right: 24px;
		}
	}
</style>
