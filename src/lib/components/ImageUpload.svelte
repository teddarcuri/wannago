<script lang="ts">
	import getBase64 from '../Image/getBase64';
	import Button from './Button.svelte';
	import addIcon from '$lib/img/add-icon.svg';

	export let onChange: Function;
	let imagePreview: string;
	let fileInput: HTMLInputElement;
	let files: FileList;

	async function handleChange() {
		const file = files?.[0];
		if (file) {
			imagePreview = await getBase64(file);
			onChange(file, imagePreview);
		}
	}
</script>

<div class="p-4">
	<input
		name="cover-photo"
		type="file"
		accept=".webp,.png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={handleChange}
	/>
	<Button class="add-button" onClick={() => fileInput.click()}>
		<div class="grid place-items-center h-full justify-center items-center">
			<img class="w-[20px] h-[20px]" src={addIcon} />
		</div>
	</Button>
</div>

<style lang="scss">
	div :global(.add-button) {
		border-radius: 50%;
		width: 60px;
		height: 60px;
		padding: 2px;
	}

	div :global(.add-button .inner) {
		border-radius: 50%;
		height: 100%;
		width: 100%;
	}

	input {
		display: none;
	}
</style>
