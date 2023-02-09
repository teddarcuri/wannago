<script>
	import { page } from '$app/stores';
</script>

<div class="root flex w-full h-full">
	<div class="main pt-[60px]">
		{#key $page.params.id}
			<slot />
		{/key}
	</div>
	<div class="flex-1 relative z-50">
		<slot name="content" />
	</div>
</div>

<style lang="scss">
	.root {
		pointer-events: none;
		flex-flow: row nowrap;
		align-items: flex-start;
		flex: 1 1 100%;
		position: relative;
		z-index: 150;

		& > * {
			pointer-events: auto;
		}
	}

	.main {
		@apply pl-[15px];
	}

	@media (max-width: 700px) {
		.main {
			@apply w-full absolute bottom-0 left-0
			pl-[0px];
		}
	}
</style>
