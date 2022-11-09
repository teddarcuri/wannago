<script lang="ts">
	import { activeInfoDisplay } from './stores.ts';

	let displayText;
	activeInfoDisplay.subscribe((data) => (displayText = data.displayText));
</script>

<div
	class="
		absolute top-0 left-0 z-50  w-[220px] 
		bg-zinc-900 px-3 py-2 text-center 
		text-sm tracking-widest"
>
	{displayText}
</div>
