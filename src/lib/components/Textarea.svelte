<script>
	export let name;
	export let disabled;
	export let placeholder;
	export let value = '';
	export let onBlur;

	let focus = false;

	// This textarea is setup with a sibling element
	// that is used to auto size the textarea as content changes
	let replicatedValue = value;
</script>

<div data-replicated-value={replicatedValue} class="root" class:focus class:disabled>
	<textarea
		{name}
		{disabled}
		{placeholder}
		bind:value
		on:blur={() => {
			focus = false;
			onBlur();
		}}
		on:focus={() => (focus = true)}
		on:input={e => (replicatedValue = e.target.value)}
	/>
</div>

<style lang="scss">
	/* 
        This textarea is setup with a sibling element
        that is used to auto size the textarea as content changes
    */
	.root {
		/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
		display: grid;
	}
	.root::after {
		/* Note the weird space! Needed to preventy jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}
	.root > textarea {
		/* You could leave this, but after a user resizes, then it ruins the auto sizing */
		resize: none;

		/* Firefox shows scrollbar on growth, you can hide like this. */
		overflow: hidden;
	}
	.root > textarea,
	.root::after {
		transition: padding ease 0.2s;
		@apply bg-black
         resize-none
		 w-full 
		 p-8 py-6
		 border-2
		 border-transparent
		 text-stone-300
		 text-base;

		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}

	.root:not(.disabled) {
		&:hover {
			&::after,
			textarea {
				@apply py-8;
			}
		}

		&.focus {
			&::after,
			textarea {
				@apply py-8 pb-10;
			}
			textarea {
				@apply outline-0;
			}
		}
	}
</style>
