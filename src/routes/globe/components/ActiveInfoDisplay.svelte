<script lang="ts">
	import { page } from '$app/stores';
	import { activeInfoDisplayStore, ActiveInfoDisplayStatus } from '$lib/stores/activeInfoDisplay';

	const DEFAULT_DISPLAY_TEXT = 'Document Your World.';
	let bgColor: string = 'bg-zinc-900';
	let displayText: string;
	let status: ActiveInfoDisplayStatus;

	$: session = $page.data.session;
	$: status = $activeInfoDisplayStore.status;
	$: displayText = !session
		? 'Create an account to save destinations'
		: $activeInfoDisplayStore.displayText || DEFAULT_DISPLAY_TEXT;
	$: bgColor = {
		[ActiveInfoDisplayStatus.Action]: 'bg-amber-600',
		[ActiveInfoDisplayStatus.Normal]: 'bg-zinc-900',
		[ActiveInfoDisplayStatus.Success]: 'bg-emerald-700',
		[ActiveInfoDisplayStatus.Error]: 'bg-red-700',
		[ActiveInfoDisplayStatus.Information]: 'bg-emerald-800',
		[ActiveInfoDisplayStatus.Loading]: 'bg-slate-500',
		[ActiveInfoDisplayStatus.Black]: 'bg-stone-900'
	}[status];
</script>

<div class={bgColor}>
	{displayText}
</div>

<style>
	div {
		@apply absolute top-0 left-0 z-50 min-w-[220px] 
		 px-7 py-2 text-center opacity-80
		rounded-br-sm
		text-sm tracking-widest;

		transition: all ease 0.6s;
	}
</style>
