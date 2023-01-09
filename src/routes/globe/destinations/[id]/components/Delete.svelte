<script>
	import { activeDestinationStore } from '@/lib/stores/activeDestination';

	export let ref;

	let confirm = false;

	const toggleConfirm = () => {
		// confirm = !confirm;
		activeDestinationStore.update(store => {
			store.deleteMode = !store.deleteMode;
			return store;
		});
	};
</script>

<button on:click={toggleConfirm} {ref} class="delete">Delete</button>

<style lang="scss">
	button.delete {
		&:hover {
			@apply bg-red-900;
		}
	}
</style>
