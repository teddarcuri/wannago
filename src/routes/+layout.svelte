<script lang="ts">
	import '../app.css';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '@/lib/components/Header.svelte';
	import Mapbox from '@/routes/globe/components/Mapbox.svelte';
	import NavigationManager from '@/lib/components/NavigationManager.svelte';
	import MyDestinations from '@/lib/components/Dashboard/MyDestinations.svelte';
	import { globalUIStore } from '@/lib/stores/globalUI';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import { page } from '$app/stores';

	onMount(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	$: isRoot = $page.url.pathname === '/';
	$: deleteMode = $activeDestinationStore.deleteMode;
</script>

<div id="app-wrapper" class:delete-mode={deleteMode}>
	<Header />
	<div id="app-body">
		<NavigationManager />
		<div class="w-full h-full flex absolute">
			<Mapbox>
				<slot />
			</Mapbox>
			<!-- <div
				style:hidden={isRoot}
				class:active={$globalUIStore.sidebarActive && !$addWaypointStore.active}
				class="sidebar"
			>
				<MyDestinations />
			</div> -->
		</div>
	</div>
</div>

<style lang="scss">
	#app-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-flow: column nowrap;
		overflow: hidden;
		@apply bg-black;

		&.delete-mode {
			@apply bg-red-800;
		}
	}

	#app-body {
		height: calc(100vh - 70px);
		display: flex;
		position: relative;
	}

	$sidebarWidth: 380px;
	.sidebar {
		@apply z-50 min-w-[300px] max-w-[555px] bg-black overflow-auto h-full;
		width: $sidebarWidth;
		margin-right: -$sidebarWidth;
		transition: all ease 0.5s;

		&.active {
			margin-right: 0;
		}
	}
</style>
