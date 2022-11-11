<script lang="ts">
	import { ActiveInfoDisplayStatus } from '../stores';
	import { activeInfoDisplayStore } from '../stores';

	let bgColor: string = 'bg-zinc-900';
	let displayText: string | undefined;
	let status: ActiveInfoDisplayStatus;

	$: status = $activeInfoDisplayStore.status;
	$: displayText = $activeInfoDisplayStore.displayText;
	$: bgColor = status === ActiveInfoDisplayStatus.Action ? 'bg-slate-800' : 'bg-zinc-900';
</script>

<div
	class={`
		absolute top-0 left-0 z-50  w-[220px] 
		${bgColor} px-3 py-2 text-center 
		text-sm tracking-widest`}
>
	{displayText}
</div>
