<script>
	export let ref;

	let confirm = false;

	const toggleConfirm = () => {
		confirm = !confirm;
	};
</script>

{#if confirm}
	<span>
		<label for="input">Type Mount Herman to delete</label>
		<input placeholder="Mount Herman" />
		<br />
		<button>Confirm</button>
		<button on:click={toggleConfirm}>Cancel</button>
	</span>
{:else}
	<button on:click={toggleConfirm} {ref} class="delete">Delete</button>
{/if}

<style lang="scss">
	span {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		padding: 10px;
		@apply bg-red-800;
	}

	button {
		&:hover {
			@apply bg-red-600;
		}
	}
</style>
