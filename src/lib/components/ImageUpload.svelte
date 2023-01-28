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
	let error: string;

	async function handleChange() {
		const file = files?.[0];
		// if file is not png, jpg or webp set error and return
		if (
			file &&
			!['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.type)
		) {
			return (error = 'File must be a png, jpg or webp');
		}

		if (file) {
			error = '';
			const dimensions = await getImageDimensions(file);
			if (dimensions.width < minWidth) return onError('Photo not wide enough');
			imagePreview = await getBase64(file);
			onChange(file, imagePreview, dimensions);
		}
	}

	function handleDrop(event) {
		event.preventDefault();
		files = event.dataTransfer.files;
		handleChange();
	}
</script>

<button
	class="p-4 absolute w-full h-full  hover:bg-stone-900 "
	on:click={() => fileInput.click()}
	on:dragenter={e => e.preventDefault()}
	on:dragover={e => e.preventDefault()}
	on:drop={handleDrop}
>
	{#if error}
		<div class="absolute top-0 left-0 w-full bg-red-700">{error}</div>
	{/if}
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
	@mixin barberpole-background {
		background: repeating-linear-gradient(120deg, #000, #000 11px, #333 11px, #333 12px);
		background-size: 200%;
		overflow: hidden;
		display: block;
	}

	button {
		@include barberpole-background;
		animation: barberpole 33s linear infinite;

		img {
			transition: all ease 0.3s;
		}

		&:hover {
			background: black;

			img {
				transform: scale(1.3);
			}
		}
	}
	input {
		display: none;
	}
</style>
