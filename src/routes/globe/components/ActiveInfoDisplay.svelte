<script lang="ts">
	import { activeInfoDisplayStore, ActiveInfoDisplayStatus } from '$lib/stores/activeInfoDisplay';

	const DEFAULT_DISPLAY_TEXT = 'Document Your World.';
	let bgColor: string = 'bg-zinc-900';
	let displayText: string;
	let status: ActiveInfoDisplayStatus;

	$: status = $activeInfoDisplayStore.status;
	$: displayText = $activeInfoDisplayStore.displayText || DEFAULT_DISPLAY_TEXT;
	$: bgColor = {
		[ActiveInfoDisplayStatus.Action]: 'bg-gray-600',
		[ActiveInfoDisplayStatus.Normal]: 'bg-zinc-900',
		[ActiveInfoDisplayStatus.Success]: 'bg-emerald-700',
		[ActiveInfoDisplayStatus.Error]: 'bg-red-700'
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
