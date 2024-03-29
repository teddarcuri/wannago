<script lang="ts">
	import getBase64 from './util/getBase64';
	import addIcon from '$lib/img/add-icon.svg';
	import getImageDimensions from '$lib/features/Images/util/getImageDimensions';

	export let minWidth = 200;
	export let onChange: Function;
	export let onError: Function;
	let imagePreview: string;
	let fileInput: HTMLInputElement;
	let files: FileList;
	let error: string;
	let isDragOver: boolean = false;

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
	class:dragover={isDragOver}
	class="p-4 absolute w-full h-full  hover:bg-stone-900"
	on:click={() => fileInput.click()}
	on:dragover={e => e.preventDefault()}
	on:drop={handleDrop}
	on:dragenter|preventDefault={() => (isDragOver = true)}
	on:dragleave={() => (isDragOver = false)}
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
		{#if isDragOver}
			<h2 class="text-2xl text-white">Drop to upload</h2>
		{:else}
			<img class="w-[24px] h-[24px]" src={addIcon} />
		{/if}
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
		background: black;

		& > * {
			pointer-events: none;
		}

		&.dragover {
			@include barberpole-background;
			animation: barberpole 33s linear infinite;
		}

		img {
			transition: all ease 0.3s;
		}

		&:hover {
			@include barberpole-background;
			animation: barberpole 33s linear infinite;
			img {
				transform: scale(1.6);
			}
		}
	}
	input {
		display: none;
	}
</style>
