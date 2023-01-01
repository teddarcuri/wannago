<script lang="ts">
	import { page } from '$app/stores';
	import {
		activeInfoDisplayStore,
		ActiveInfoDisplayStatus,
	} from '$lib/stores/activeInfoDisplay';
	import { addDestinationStore } from '@/lib/stores/addDestination';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import { fade } from 'svelte/transition';

	const DEFAULT_DISPLAY_TEXT = 'Document Your World.';
	let bgColor: string = 'bg-zinc-900';
	let displayText: string;
	let status: ActiveInfoDisplayStatus;

	$: hide =
		$activeInfoDisplayStore.hide ||
		$addWaypointStore.active ||
		$addDestinationStore.marker;
	$: session = $page.data.session;
	$: status = $activeInfoDisplayStore.status;
	$: displayText = !session
		? 'Create an account to save destinations'
		: $activeInfoDisplayStore.displayText || DEFAULT_DISPLAY_TEXT;
	$: bgColor = {
		[ActiveInfoDisplayStatus.Action]: 'bg-sky-700',
		[ActiveInfoDisplayStatus.Normal]: 'bg-zinc-900',
		[ActiveInfoDisplayStatus.Success]: 'bg-emerald-700',
		[ActiveInfoDisplayStatus.Error]: 'bg-red-700',
		[ActiveInfoDisplayStatus.Information]: 'bg-emerald-800',
		[ActiveInfoDisplayStatus.Loading]: 'bg-slate-500',
		[ActiveInfoDisplayStatus.Black]: 'bg-stone-900',
	}[status];
</script>

{#if !hide}
	<div in:fade class={bgColor}>
		{displayText}
	</div>
{/if}

<style>
	div {
		@apply absolute top-0 left-0 z-50 min-w-[220px] 
		 px-7 py-2 text-center opacity-100
		rounded-br-sm
		text-sm tracking-widest;
		z-index: 999;
	}
</style>
