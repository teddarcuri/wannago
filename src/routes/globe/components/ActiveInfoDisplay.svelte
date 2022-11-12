<script lang="ts">
	import { ActiveInfoDisplayStatus } from '../stores';
	import { activeInfoDisplayStore } from '../stores';

	const DEFAULT_DISPLAY_TEXT = 'Document Your World.';
	let bgColor: string = 'bg-zinc-900';
	let displayText: string;
	let status: ActiveInfoDisplayStatus;

	$: status = $activeInfoDisplayStore.status;
	$: displayText = $activeInfoDisplayStore.displayText || DEFAULT_DISPLAY_TEXT;
	$: bgColor = {
		[ActiveInfoDisplayStatus.Action]: 'bg-slate-800',
		[ActiveInfoDisplayStatus.Normal]: 'bg-zinc-900',
		[ActiveInfoDisplayStatus.Success]: 'bg-emerald-700',
		[ActiveInfoDisplayStatus.Error]: 'bg-red-700'
	}[status];
</script>

<div
	class={`
		absolute top-0 left-0 z-50 min-w-[220px] 
		${bgColor} px-7 py-2 text-center 
		text-sm tracking-widest`}
>
	{displayText}
</div>
