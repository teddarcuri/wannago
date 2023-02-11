<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '@/lib/db';
	import { page } from '$app/stores';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';
	import ImageUpload from '@/lib/features/Images/ImageUpload.svelte';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	interface CoverPhoto {
		id: string;
		bucket_path?: string;
		public_url?: string;
	}

	export let preview: string = '';
	export let coverPhoto: CoverPhoto;

	let imageFile = null;
	let imageDimensions;
	let isLoading = false;
	let destinationId = $page.data.destination.id;
	let showDeleteConfirmation = false;
	let uploadError;

	const userId = $page?.data?.session?.user?.id;

	async function handleUpload() {
		isLoading = true;
		activeInfoDisplayStore.update(s => ({
			...s,
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Uploading Photo...',
		}));
		if (!imageFile || !userId) return;
		// if image is more than 8mb, set error
		if (imageFile.size > 8000000) {
			isLoading = false;
			uploadError = 'Image is too large. Max size is 8mb.';
			return;
		}
		const { name } = imageFile;
		// generate path and upload file to supabase
		const path = `${userId}/destinations/${destinationId}/cover-photo--${name}`;
		const { data, error } = await supabaseClient.storage
			.from('users')
			.upload(path, imageFile);
		// Create the image row and add to destination
		if (data) {
			const { error } = await createImageRecord(data.path, imageDimensions);
			if (!error) {
				invalidateAll();
				imageFile = null;
				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Success,
					displayText: 'Cover photo updated!',
				}));

				setTimeout(() => {
					activeInfoDisplayStore.update(s => ({
						status: ActiveInfoDisplayStatus.Normal,
						displayText: '',
					}));
				}, 2000);
			}
		}

		if (error) {
			activeInfoDisplayStore.update(() => ({
				status: ActiveInfoDisplayStatus.Error,
				displayText: 'Something went wrong.',
			}));
		}

		setTimeout(() => {
			isLoading = false;
		}, 222);
	}

	async function createImageRecord(path, dimensions) {
		// get the photo's public url
		const {
			data: { publicUrl },
		} = await supabaseClient.storage.from('users').getPublicUrl(path);
		// build object
		const imageRecord = {
			public_url: publicUrl,
			bucket_path: path,
			user_id: userId,
			height: dimensions.height,
			width: dimensions.width,
		};
		// Insert into DB
		const { data, error } = await supabaseClient
			.from('images')
			.insert(imageRecord)
			.select();
		// add foreign key
		if (data && data[0]) {
			const { id: imageId } = data[0];
			return await supabaseClient
				.from('destinations')
				.update({ cover_photo: imageId })
				.eq('id', destinationId);
		}
	}

	async function handleRemove() {
		try {
			isLoading = true;
			// Remove file from storage
			await supabaseClient.storage.from('users').remove([coverPhoto.bucket_path]);
			// Remove foreign key
			await supabaseClient
				.from('destinations')
				.update({ cover_photo: null })
				.eq('id', destinationId);
			// Remove the photo db record
			await supabaseClient.from('images').delete().eq('id', coverPhoto.id);
			await invalidateAll();
			showDeleteConfirmation = false;
			isLoading = false;
		} catch (e) {
			isLoading = false;
			console.error(e);
		}
	}
</script>

<section>
	{#if isLoading}
		<LoadingOverlay />
	{/if}
	{#if coverPhoto}
		<img class="photo" src={coverPhoto.public_url} />

		<div class="z-50 absolute w-full h-full grid place-items-center">
			<div class="drawer absolute grid bottom-0 left-0 p-8 w-full bg-black/50">
				<h4>{showDeleteConfirmation ? 'Are you sure?' : 'Cover Photo'}</h4>

				<div class="buttons mt-4">
					{#if showDeleteConfirmation}
						<button class="red" on:click={handleRemove}>Yes, delete</button>
						<button on:click={() => (showDeleteConfirmation = false)}>Cancel</button>
					{:else}
						<button>View</button>
						<button class="red" on:click={() => (showDeleteConfirmation = true)}
							>Delete</button
						>
					{/if}
				</div>
			</div>
		</div>
	{:else if !coverPhoto && imageFile && preview}
		<img class="preview" src={preview} />
		<div class="z-50 absolute w-full h-full grid place-items-center">
			<div class="absolute bottom-0 left-0 p-8 w-full bg-black/50">
				<h4>Preview</h4>
				<p>Save this cover photo?</p>
				{#if uploadError}<p class="text-red-700 p-1 text-xl rounded-md my-2">
						{uploadError}
					</p>{/if}

				<div class="buttons mt-4">
					<button on:click={handleUpload}>Confirm</button>
					<button on:click={() => (preview = '')}>Cancel</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="grid place-items-center">
			<ImageUpload
				onChange={(file, base64, dimensions) => {
					preview = base64;
					imageFile = file;
					imageDimensions = dimensions;
				}}
				onError={error => (uploadError = error)}
			/>

			<div
				class="drawer pointer-events-none absolute grid z-50 bottom-0 left-0 p-4 w-full bg-black/0"
			>
				<h4 class="px-4">Cover Photo</h4>

				<!-- <p class="p-4 opacity-80"> -->
				<!-- 	This photo will be used to identify this destination throughout the app -->
				<!-- </p> -->
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		@apply bg-black w-[90%] max-w-[444px] h-[400px]
        grid place-items-center rounded-lg relative overflow-hidden;
		padding: 20px;
	}

	.preview {
		opacity: 0.69;
	}

	.buttons {
		button {
			@apply uppercase text-xs tracking-widest text-stone-200 bg-emerald-600 py-2 px-3 mr-2 rounded-md;

			&.red {
				@apply bg-red-800;
			}

			&:nth-child(2) {
				@apply bg-stone-600;
			}

			&:hover {
				@apply bg-black;
			}
		}
	}

	h4 {
		@apply text-2xl text-white;
	}

	img {
		@apply absolute top-0 left-0
        w-full h-full object-cover;
	}

	div:has(.drawer) {
		.drawer {
			transition: all ease 0.222s;
			transform: translateY(100%);
		}

		&:hover {
			.drawer {
				transform: translateY(0);
			}
		}
	}
</style>
