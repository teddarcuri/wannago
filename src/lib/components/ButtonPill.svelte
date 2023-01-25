<script>
	export let cancel = false;
	export let handleClick;
</script>

<button on:click={handleClick} class:cancel>
	<slot />
</button>

<style lang="scss">
	button {
		@apply tracking-wide mr-2 text-sm inline-flex w-auto p-2 px-3 flex-grow-0 rounded-md  bg-emerald-900;

		&.cancel {
			@apply bg-stone-800;
		}

		&:hover {
			@apply bg-emerald-800;
		}

		&:first-child {
			@apply ml-[-12px];
		}

		&.inActive {
			background: none;

			&:focus {
				@apply bg-emerald-800;

				span {
					display: none;
				}

				&:before {
					content: 'Save Coordinates';
				}
			}
		}
	}
</style>
