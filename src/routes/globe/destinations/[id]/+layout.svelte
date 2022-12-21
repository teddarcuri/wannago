<script lang="ts">
	import type { PageData } from './$types';
	import { supabaseClient } from '@/lib/db';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	import { page } from '$app/stores';
	import { afterNavigate, invalidate, invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import DisplayCard from '../../components/DisplayCard.svelte';
	import Coordinates from './components/Coordinates.svelte';
	import closeIcon from '$lib/img/close.svg';
	import galleryIcon from '$lib/img/gallery.svg';
	import backIcon from '$lib/img/back.svg';
	import mountainIcon from '$lib/img/mountain.svg';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';

	enum DefaultWallpapers {
		Aurora = 'https://imgs.search.brave.com/mAiiqzY80x4U-OWobUWXLBfbnUxZxrCIHw1bl2BwZHM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd3d3LnRv/cDEwbGlmZXN0eWxl/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMTEvYXJ0/LWFzdHJvbm9teS1h/dG1vc3BoZXJlLTM2/MDkxMi5qcGc',
		Sunset = 'https://imgs.search.brave.com/sQkT26CFbrcRgWamq9NmY2jCeyviP6LJF0MDJmvSlfI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9qb29p/bm4uY29tL2ltYWdl/cy9nZXJtYW4tbW91/bnRhaW5zLTIuanBn',
		Bells = 'https://imgs.search.brave.com/VlQlUG1ci_9VaI9CwC39eCc	M	tjGAhwBgDU_YPhExqQk/rs:fit:1200:887:1/g:ce/aHR0cHM6Ly93d3cu/Y29sb3JhZG8uY29t/L3NpdGVzL2RlZmF1/bHQvZmlsZXMvQ09f/UGhvdG9Qcm9qZWN0/MjAwN18wMDA3XzBf/MC5qcGc',
		Pikes = 'https://imgs.search.brave.com/y7NUhuWFCMB9mSw8IF6cQ0et9dUWnJpYoVDM_2fAJy0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LmFz/cGhhbHRhbmRydWJi/ZXIuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzA1L2t0/bS1waWtlcy1wZWFr/LWNocmlzLWZpbGxt/b3JlLXNjYWxlZC5q/cGc_Zml0PTI1NjAl/MkMxNzA3JnNzbD0x',
		Wave = 'https://imgs.search.brave.com/4ZWXDXMDHYKmyioE20UGd_BplItXYx_S4ClUaXytSNo/rs:fit:550:826:1/g:ce/aHR0cHM6Ly9mcmVl/eW9yay5vcmcvd3At/Y29udGVudC91cGxv/YWRzLzIwMTUvMDgv/VGhlLVdhdmUtQXJp/em9uYS03LmpwZw',
	}

	export let data: PageData;

	let loading = false;
	let destination = data.destination;
	let name = destination.name;
	let description = destination.description;
	let lat = destination.coordinates.coordinates[1];
	let lng = destination.coordinates.coordinates[0];

	// Gallery link
	$: isGallery = $page?.routeId === '/globe/destinations/[id]/gallery';
	$: galleryButtonText = isGallery ? 'Exit Gallery' : 'View Gallery';
	$: galleryLink = isGallery
		? `/globe/destinations/${$page.params.id}`
		: `${$page.url}/gallery`;

	const handleSubmit = async e => {
		loading = true;

		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Saving...',
		}));

		const updates = {
			name,
			description,
		};

		// Update record
		const { error, data } = await supabaseClient
			.from('destinations')
			.update(updates)
			.eq('id', destination.id);

		// TODO: be more specific with this invalidation
		invalidateAll();

		/* 
            TODO
            updateActiveInfoDisplay({
                delay: 900,
                error,
                errorText: 'Something Went Wrong',
                successText: 'Destination Saved.'
                resetTimeout: 2200
            })
        */
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
	};
</script>

<main>
	<DisplayCard>
		<div class="root relative z-50 bg-black  w-full rounded-lg ">
			{#if Boolean(!destination)}
				<span transition:fade>
					<LoadingOverlay />
				</span>
			{/if}
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
				{#if !loading && !isGallery}
					<div class="controls absolute flex top-2 left-2 z-30">
						<a href="/globe"><img class="h-[11px] w-[11px]" src={closeIcon} /></a>
					</div>
				{/if}

				<!-- Form -->
				<form on:submit|preventDefault={handleSubmit}>
					<section>
						<div class="flex flex-col">
							<!-- <img width={22} src={mountainIcon} /> -->
							<textarea
								name="name"
								rows="1"
								disabled={isGallery}
								class="text-3xl bg-transparent font-semibold"
								bind:value={name}
								on:blur={name !== destination.name ? handleSubmit : null}
							/>
							{#if destination.coordinates}
								<Coordinates disabled={isGallery} {lat} {lng} />
							{/if}
						</div>
						<textarea
							name="description"
							bind:value={description}
							disabled={isGallery}
							on:blur={description !== destination.description ? handleSubmit : null}
							placeholder="Enter a description..."
						/>
					</section>
				</form>
			{/if}
		</div>
	</DisplayCard>

	<div class="slot-wrapper">
		<slot />
	</div>
</main>

<style lang="scss">
	main {
		@apply absolute top-[50px] left-[15px];
	}

	form {
		@apply w-full;
	}

	h3 {
		@apply p-6 border-t-2 border-stone-800;
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
		 text-lg;

		&:hover:not([disabled]) {
			@apply py-6;
		}

		&:focus:not([disabled]) {
			@apply py-6;
			background: #222;
		}

		&:focus-visible:not([disabled]) {
			@apply outline-0;
		}
	}

	[name='name'] {
		@apply rounded-md;
		padding: 6px 0px;
		border: solid 2px transparent;
		transition: all ease 0.2s;
		resize: none;

		&:focus:not([disabled]),
		&:hover:not([disabled]) {
			padding: 6px;
		}

		&:focus:not([disabled]) {
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
		@apply sticky top-0 pt-[190px] h-[190px] w-full rounded-t-lg;
		overflow: hidden;
		background-image: linear-gradient(0deg, #000, rgba(0, 0, 0, 1));
		display: block;

		&:hover > img,
		&.active > img,
		&:focus > img {
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

		&:hover,
		&:focus {
			button {
				opacity: 1;
			}
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
		left: 420px;
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