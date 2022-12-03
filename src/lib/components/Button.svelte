<script lang="ts">
	export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button class={$$props.class} on:click|preventDefault={onClick}>
	<div class="inner">
		<slot />
	</div>
	<div class="gradient" />
</button>

<style lang="scss">
	button {
		@apply relative text-zinc-400 rounded-sm overflow-hidden;
		padding: 1px;

		&:hover {
			.inner {
				@apply bg-opacity-90 bg-black;
			}

			.gradient {
				background-image: linear-gradient(
					var(--angle),
					rgb(101, 197, 133),
					#307f6e,
					#6fdbf6,
					rgb(102, 175, 102),
					rgb(62, 127, 187)
				);
			}
		}
	}

	.inner {
		@apply bg-black bg-opacity-90 p-4 py-2 rounded-sm z-10 relative;
	}

	.gradient {
		@apply absolute top-0 left-0 h-full w-full bg-slate-700;
		z-index: 0;
		animation: 5.555s rotate cubic-bezier(0.84, 0.16, 0.39, 1.2) infinite;
		background-image: linear-gradient(var(--angle), #9ba9be, #425369, #6691cd);
	}
</style>
