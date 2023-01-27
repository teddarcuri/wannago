<script lang="ts">
	import getBase64 from '../Image/getBase64';
	import Button from './Button.svelte';
	import addIcon from '$lib/img/add-icon.svg';
	import getImageDimensions from '../Image/getImageDimensions';

	export let minWidth = 200;
	export let onChange: Function;
	export let onError: Function;
	let imagePreview: string;
	let fileInput: HTMLInputElement;
	let files: FileList;

	async function handleChange() {
		const file = files?.[0];
		if (file) {
			const dimensions = await getImageDimensions(file);
			if (dimensions.width < minWidth) return onError('Photo not wide enough');
			imagePreview = await getBase64(file);
			onChange(file, imagePreview, dimensions);
		}
	}
</script>

<button
	class="p-4 absolute w-full h-full hover:bg-stone-900 "
	on:click={() => fileInput.click()}
>
	<input
		name="cover-photo"
		type="file"
		accept=".webp,.png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={handleChange}
	/>
	<div class="grid place-items-center h-full justify-center items-center">
		<img class="w-[33px] h-[33px]" src={addIcon} />
	</div>
</button>

<style lang="scss">
	input {
		display: none;
	}
</style>
