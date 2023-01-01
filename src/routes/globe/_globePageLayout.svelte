<script>
	import ContextBanner from '@/lib/components/ContextBanner.svelte';
</script>

<div class="root flex w-full h-full">
	<div class="pt-[50px] pl-[15px]">
		<slot />
	</div>
	<div class="flex-1 relative">
		<ContextBanner />
		<slot name="content" />
	</div>
</div>

<style lang="scss">
	.root {
		pointer-events: none;
		flex-flow: row nowrap;
		align-items: flex-start;
		flex: 1 1 100%;

		& > * {
			pointer-events: auto;
		}
	}
</style>
