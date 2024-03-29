<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	import { supabaseClient } from '$lib/db';
	import { goto, invalidate } from '$app/navigation';
	import { afterUpdate, onMount } from 'svelte';
	import Header from '@/lib/components/Header.svelte';
	import Mapbox from '@/routes/globe/components/Mapbox.svelte';
	import NavigationManager from '@/lib/components/NavigationManager.svelte';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import CommandCenter from '@/lib/components/CommandCenter.svelte';
	import DeveloperTools from '@/lib/components/DeveloperTools.svelte';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	import { fade } from 'svelte/transition';

	import { env } from '$env/dynamic/public';

	let loading = true;

	$: session = $page.data.session;
	$: deleteMode = $activeDestinationStore.deleteMode;

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

	afterUpdate(async () => {
		if ($page.url.pathname !== '/welcome' && !session) await goto('/welcome');
		if (loading) loading = false;
	});
</script>

<div id="app-wrapper" class:delete-mode={deleteMode}>
	<Header />
	<!-- <DeveloperTools /> -->
	<div id="app-body">
		<CommandCenter />
		<NavigationManager />
		<div class="map w-full h-full flex absolute">
			<Mapbox>
				{#if loading}
					<!-- <div transition:fade class="absolute top-0 left-0 w-full h-full bg-black z-50"> -->
					<LoadingOverlay />
					<!-- </div> -->
				{:else}
					<slot />
				{/if}
			</Mapbox>
		</div>
	</div>
</div>

<style lang="scss">
	.map {
		&.showCursor {
			cursor: crosshair !important;
		}
	}

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
