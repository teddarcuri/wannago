<script>
	import ButtonPill from '@/lib/components/ButtonPill.svelte';
</script>

<form class="bg-black rounded-md overflow-auto p-[33px]">
	<h2 class="text-xl text-stone-300 mb-8">
		<span class="mr-2">🌎</span> How would <b>you</b> like to use wannago?
	</h2>
	<p class="opacity-70 my-5 font-semibold">
		Tell us what type of features would add value.
	</p>

	<div class="feedback">
		<textarea placeholder="Leave us some feedback." name="feedback" />
	</div>

	<div class="flex justify-end mt-4">
		<ButtonPill>Submit feedback</ButtonPill>
	</div>
</form>
