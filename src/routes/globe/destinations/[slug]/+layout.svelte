<script lang="ts">
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import DisplayCard from '../../components/DisplayCard.svelte';
	import focusIcon from '$lib/img/focus.svg';
	import closeIcon from '$lib/img/close.svg';
	import galleryIcon from '$lib/img/gallery.svg';
	import backIcon from '$lib/img/back.svg';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';
	import { supabaseClient } from '@/lib/db';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	import { navigating, page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { invalidateAll } from '$app/navigation';
	//imgs.search.brave.com/VlQlUG1ci_9VaI9CwC39eCc	M	tjGAhwBgDU_YPhExqQk/rs:fit:1200:887:1/g:ce/aHR0cHM6Ly93d3cu/Y29sb3JhZG8uY29t/L3NpdGVzL2RlZmF1/bHQvZmlsZXMvQ09f/UGhvdG9Qcm9qZWN0/MjAwN18wMDA3XzBf/MC5qcGc'
	enum DefaultWallpapers {
		Aurora = 'https://imgs.search.brave.com/mAiiqzY80x4U-OWobUWXLBfbnUxZxrCIHw1bl2BwZHM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd3d3LnRv/cDEwbGlmZXN0eWxl/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMTEvYXJ0/LWFzdHJvbm9teS1h/dG1vc3BoZXJlLTM2/MDkxMi5qcGc',
		Sunset = 'https://imgs.search.brave.com/sQkT26CFbrcRgWamq9NmY2jCeyviP6LJF0MDJmvSlfI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9qb29p/bm4uY29tL2ltYWdl/cy9nZXJtYW4tbW91/bnRhaW5zLTIuanBn',
		Bells = 'https://imgs.search.brave.com/VlQlUG1ci_9VaI9CwC39eCc	M	tjGAhwBgDU_YPhExqQk/rs:fit:1200:887:1/g:ce/aHR0cHM6Ly93d3cu/Y29sb3JhZG8uY29t/L3NpdGVzL2RlZmF1/bHQvZmlsZXMvQ09f/UGhvdG9Qcm9qZWN0/MjAwN18wMDA3XzBf/MC5qcGc',
		Pikes = 'https://imgs.search.brave.com/y7NUhuWFCMB9mSw8IF6cQ0et9dUWnJpYoVDM_2fAJy0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LmFz/cGhhbHRhbmRydWJi/ZXIuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzA1L2t0/bS1waWtlcy1wZWFr/LWNocmlzLWZpbGxt/b3JlLXNjYWxlZC5q/cGc_Zml0PTI1NjAl/MkMxNzA3JnNzbD0x',
		Wave = 'https://imgs.search.brave.com/4ZWXDXMDHYKmyioE20UGd_BplItXYx_S4ClUaXytSNo/rs:fit:550:826:1/g:ce/aHR0cHM6Ly9mcmVl/eW9yay5vcmcvd3At/Y29udGVudC91cGxv/YWRzLzIwMTUvMDgv/VGhlLVdhdmUtQXJp/em9uYS03LmpwZw',
	}

	export let data;

	let loading = false;
	let form = writable({ name: '', description: '' }); // there has to be a better way.
	$: destination = data?.destination;
	$: lat = destination?.coordinates.coordinates[1];
	$: lng = destination?.coordinates.coordinates[0];
	$: promptUnsavedChanges = false;
	$: isGallery = $page?.routeId === '/globe/destinations/[slug]/gallery';
	$: galleryButtonText = isGallery ? 'Exit Gallery' : 'View Gallery';
	$: galleryLink = isGallery
		? `/globe/destinations/${$page.params.slug}`
		: `${$page.url}/gallery`;

	// $: console.log($page.routeId, $page);
	const handleSubmit = async e => {
		console.log($form.name, destination);
		loading = true;
		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Saving...',
		}));

		// TODO: Figure out a way to prevent the need
		// to do use this OR logic here. This is a result
		// of not having proper data binding on our form element
		// The inputs are initialzied with Or logic, instead of
		// the value they are bound to being the one that contains
		// the or operator...

		const updates = {
			name: $form.name || destination.name,
			description: $form.description || destination.description,
		};
		// I was also forced to do an upsert here. We should find out why and change it if possible
		const { error, data } = await supabaseClient
			.from('destinations')
			.update(updates)
			.eq('id', destination.id);
		invalidateAll();
		setTimeout(() => {
			loading = false;

			if (error) {
				activeInfoDisplayStore.update(s => ({
					status: ActiveInfoDisplayStatus.Error,
					displayText: 'Something went wrong',
				}));
				return;
			}

			activeInfoDisplayStore.update(s => ({
				status: ActiveInfoDisplayStatus.Success,
				displayText: 'Destination saved.',
			}));
		}, 900);

		setTimeout(() => {
			activeInfoDisplayStore.update(s => ({
				status: ActiveInfoDisplayStatus.Normal,
				displayText: '',
			}));
		}, 2200);

		console.log({
			error,
			data,
		});
	};
</script>

<DisplayCard>
	<div class="root relative z-50 bg-black min-w-[405px] w-full h-full rounded-lg ">
		<!-- {#if loading || $navigating || Boolean(!destination)} -->
		<!-- 	<LoadingOverlay /> -->
		<!-- {/if} -->

		{#if Boolean(destination)}
			<!-- Cover Photo -->
			<a href={galleryLink} class:active={isGallery} class="image-wrapper">
				<img
					alt="Destination Cover Photo"
					class="cover"
					src={destination?.cover_photo?.public_url ?? DefaultWallpapers.Bells}
				/>
				<button class:active={isGallery} class="view-gallery">
					<img
						alt={galleryButtonText}
						class="icon w-[17px] h-[17px] mr-2"
						src={isGallery ? backIcon : galleryIcon}
					/>
					<span>{galleryButtonText}</span>
				</button>
			</a>
			<!-- Buttons/Controls -->
			{#if !isGallery}
				<div class="controls absolute flex top-2 left-2 z-30">
					<a href="/globe"><img class="h-[11px] w-[11px]" src={closeIcon} /></a>
				</div>
			{/if}
			<form on:submit|preventDefault={handleSubmit}>
				<!-- Form -->
				<section>
					<div class="flex flex-col">
						<textarea
							name="name"
							rows="1"
							class="text-3xl bg-transparent font-semibold"
							value={$form.name || destination.name}
							on:blur={handleSubmit}
							on:input={e => form.update(s => ({ ...s, name: e.target.value }))}
						/>
						{#if destination.coordinates}
							<button class="coordinates">
								{getLatLngDisplayText(lat, lng)}
							</button>
						{/if}
					</div>
					<textarea
						name="description"
						value={$form.description || destination.description}
						on:blur={handleSubmit}
						on:input={e => form.update(s => ({ ...s, description: e.target.value }))}
						placeholder="Enter a description..."
					/>
				</section>
				<!-- <h3>Links</h3> -->
				<!-- <h3>Waypoints</h3> -->
				{#if false || promptUnsavedChanges}
					<div class="unsaved-changes">
						<button class="text-sm text-zinc-400">Cancel</button>
						<button class="ml-4 mt-0" on:click|preventDefault={handleSubmit}
							>Save Changes</button
						>
					</div>
				{/if}
			</form>
		{/if}
	</div>
	<div class="slot-wrapper">
		<slot />
	</div>
</DisplayCard>

<style lang="scss">
	form {
		@apply w-full;
	}

	h3 {
		@apply p-6 border-t-2 border-stone-800;
	}

	.coordinates {
		@apply inline-flex w-auto p-2 px-4 flex-grow-0 ml-[-12px] rounded-full;
		&:hover {
			@apply bg-sky-800;
		}
	}

	[name='description'] {
		transition: padding ease 0.2s;
		@apply bg-black
        resize-none
		 w-full 
		 p-8 py-4 
		 border-2
		 border-transparent
		 text-stone-300
		 text-lg
         mt-2;

		&:hover {
			@apply pb-6;
		}

		&:focus {
			background: rgba(255, 255, 255, 0.1111);
			border: solid 2px rgba(222, 222, 222, 0.222);
		}

		&:focus-visible {
			@apply outline-0 p-10;
		}
	}

	[name='name'] {
		@apply rounded-md;
		padding: 6px 0px;
		border: solid 2px transparent;
		transition: all ease 0.2s;
		resize: none;

		&:focus,
		&:hover {
			padding: 6px;
		}

		&:focus {
			background: rgba(255, 255, 255, 0.1111);
			border: solid 2px rgba(222, 222, 222, 0.222);
		}

		&:focus-visible {
			@apply outline-0;
		}
	}

	.controls {
		a,
		button {
			@apply rounded-full flex align-middle items-center justify-center;
			height: 50px;
			width: 50px;

			&:hover {
				@apply bg-stone-900;
			}
		}
	}

	.root img {
		transition: all ease 0.2s;
	}

	.image-wrapper {
		@apply pt-[155px] h-[155px] w-full rounded-t-lg;
		overflow: hidden;
		position: relative;
		background-image: linear-gradient(0deg, #000, rgba(0, 0, 0, 1));
		display: block;

		&:hover > img,
		&.active > img {
			transform: scale(1.1);
			filter: blur(13px);
		}

		&.active:hover > img {
			filter: blur(15px);
			transform: scale(1.15);
		}
	}

	.image-wrapper {
		button {
			opacity: 0;
			transition: all ease 0.3s;
		}

		&:hover button {
			opacity: 1;
		}
	}

	.cover {
		@apply absolute opacity-60 
		w-full h-full
		object-center
		top-0 left-0 z-0 object-cover;
	}

	section {
		@apply relative;
	}

	section div:first-child {
		@apply px-8;
		margin-top: -70px;
		background-image: linear-gradient(0deg, #000 20%, rgba(0, 0, 0, 0));
	}

	.slot-wrapper {
		@apply absolute -top-[50px] 
        overflow-auto;
		max-height: calc(100vh - 55px);
		width: calc(100vw - 100%);
		left: 100%;
	}

	/* View Gallery */
	.view-gallery {
		@apply absolute top-1/2 left-1/2 text-sm
            -mt-[16px] py-2 px-4 rounded-full
			-translate-y-[50%] -translate-x-[50%]
			 flex items-center;
		background: rgba(255, 255, 255, 0.1);

		&.active {
			background: rgba(0, 0, 0, 0.3);
			opacity: 1;

			&:hover {
				background: rgba(0, 0, 0, 0.8);
			}
		}
	}
</style>
