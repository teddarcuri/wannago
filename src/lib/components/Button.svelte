<script lang="ts">
	export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button class={$$props.class} on:click|preventDefault={onClick}>
	<div class="inner">
		<slot />
	</div>
</button>

<style lang="scss">
	button {
		@apply relative text-zinc-400 
	 	overflow-hidden bg-gray-900 
		hover:bg-gray-700;
		padding: 2px;

		&:hover {
			.inner {
				@apply bg-opacity-90 bg-black;
			}
		}
	}

	.inner {
		@apply bg-black text-xl bg-opacity-90 
		flex p-4 py-2 rounded-sm z-10 relative;
	}
</style>
