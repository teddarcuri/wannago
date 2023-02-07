<script lang="ts">
	import { afterUpdate, onMount, beforeUpdate, getContext } from 'svelte';
	import type { PageData } from './$types';
	import { supabaseClient } from '@/lib/db';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	import { page } from '$app/stores';
	import { afterNavigate, invalidate, invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import DisplayCard from '$lib/components/DisplayCard.svelte';
	import Coordinates from './components/Coordinates.svelte';
	import closeIcon from '$lib/img/close.svg';
	import galleryIcon from '$lib/img/gallery.svg';
	import centerIcon from '$lib/img/center.svg';
	import backIcon from '$lib/img/back.svg';
	import mountainIcon from '$lib/img/mountain.svg';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '@/lib/stores/activeInfoDisplay';
	import Textarea from '@/lib/components/Textarea.svelte';
	import GlobePageLayout from '../../_globePageLayout.svelte';
	import Waypoints from './components/Waypoints.svelte';
	import { addWaypointStore } from '@/lib/stores/addWaypoint';
	import { activeDestinationStore } from '@/lib/stores/activeDestination';
	import { userDestinationsStore } from '@/lib/stores/userDestinations';
	import WaypointMarkers from '../../components/WaypointMarkers.svelte';
	import DestinationTypeSelector from '$lib/features/Destinations/DestinationTypeSelector.svelte';
	enum DefaultWallpapers {
		Aurora = 'https://imgs.search.brave.com/mAiiqzY80x4U-OWobUWXLBfbnUxZxrCIHw1bl2BwZHM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd3d3LnRv/cDEwbGlmZXN0eWxl/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMTEvYXJ0/LWFzdHJvbm9teS1h/dG1vc3BoZXJlLTM2/MDkxMi5qcGc',
		Sunset = 'https://imgs.search.brave.com/sQkT26CFbrcRgWamq9NmY2jCeyviP6LJF0MDJmvSlfI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9qb29p/bm4uY29tL2ltYWdl/cy9nZXJtYW4tbW91/bnRhaW5zLTIuanBn',
		Bells = 'https://imgs.search.brave.com/VlQlUG1ci_9VaI9CwC39eCc	M	tjGAhwBgDU_YPhExqQk/rs:fit:1200:887:1/g:ce/aHR0cHM6Ly93d3cu/Y29sb3JhZG8uY29t/L3NpdGVzL2RlZmF1/bHQvZmlsZXMvQ09f/UGhvdG9Qcm9qZWN0/MjAwN18wMDA3XzBf/MC5qcGc',
		Pikes = 'https://imgs.search.brave.com/y7NUhuWFCMB9mSw8IF6cQ0et9dUWnJpYoVDM_2fAJy0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LmFz/cGhhbHRhbmRydWJi/ZXIuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzA1L2t0/bS1waWtlcy1wZWFr/LWNocmlzLWZpbGxt/b3JlLXNjYWxlZC5q/cGc_Zml0PTI1NjAl/MkMxNzA3JnNzbD0x',
		Wave = 'https://imgs.search.brave.com/4ZWXDXMDHYKmyioE20UGd_BplItXYx_S4ClUaXytSNo/rs:fit:550:826:1/g:ce/aHR0cHM6Ly9mcmVl/eW9yay5vcmcvd3At/Y29udGVudC91cGxv/YWRzLzIwMTUvMDgv/VGhlLVdhdmUtQXJp/em9uYS03LmpwZw',
	}

	export let data: PageData;

	const { getMap } = getContext('map');
	let map;
	let loading = false;
	let formData = {
		...data.destination,
	};

	$: destination = data.destination;
	$: lat = destination?.coordinates?.coordinates[1];
	$: lng = destination?.coordinates?.coordinates[0];

	// Gallery link
	$: isGallery = $page?.routeId === '/globe/destinations/[id]/gallery';
	$: galleryButtonText = isGallery ? 'Exit Gallery' : 'View Gallery';
	$: galleryLink = isGallery
		? `/globe/destinations/${$page.params.id}`
		: `${$page.url}/gallery`;
	$: coverPhoto = destination?.cover_photo?.public_url;

	enum Fields {
		name,
		description,
		type_id,
	}

	afterUpdate(async () => {
		// This is kind of dumb. If I dont do this fly to doesnt work.
		map = await getMap();

		// Reset form data if destination changes
		if (formData.id !== data.destination.id) {
			formData = {
				...data.destination,
			};
		}
	});

	const handleFlyTo = () => {
		if (!map || !lat || !lng) throw Error('Map not loaded or something!?!?!');
		map.flyTo({
			center: [lng, lat],
			zoom: 15,
		});
	};

	const handleSubmit = async field => {
		if (field === Fields.name && formData.name === destination.name) return;
		if (field === Fields.type_id && formData.type_id === destination.type_id) return;
		if (field === Fields.description && formData.description === destination.description)
			return;
		loading = true;

		activeInfoDisplayStore.update(s => ({
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Saving...',
		}));

		// TODO: refactor this into sveltekit route
		const updates = {
			name: formData.name,
			description: formData.description,
			type_id: formData.type_id,
		};

		// Update record
		const { error, data } = await supabaseClient
			.from('destinations')
			.update(updates)
			.eq('id', destination.id);

		// TODO: be more specific with this invalidation
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
	};
</script>

<GlobePageLayout>
	{#if !$addWaypointStore.active && !$activeDestinationStore.deleteMode && !isGallery}
		<main in:fade={{ delay: 222, duration: 111 }}>
			<DisplayCard>
				<div class="root group relative z-50 bg-black w-full rounded-lg">
					{#if Boolean(!destination)}
						<span transition:fade>
							<LoadingOverlay />
						</span>
					{/if}
					{#if Boolean(destination)}
						<!-- Cover Photo -->
						<a
							href={galleryLink}
							class:active={isGallery}
							class:hasImage={Boolean(coverPhoto)}
							class="image-wrapper"
						>
							{#if coverPhoto}
								<img
									alt="Destination Cover Photo"
									class="cover"
									src={coverPhoto ?? DefaultWallpapers.Bells}
								/>
							{/if}

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
						<div class="fly-to control-button">
							<button title="Focus Location" on:click={handleFlyTo}>
								<img
									src={centerIcon}
									alt="Fly to destination"
									class="icon w-[24px] h-[24px]"
								/>
							</button>
						</div>

						{#if !loading && !isGallery}
							<div class="control-button absolute flex top-2 left-2 z-30">
								<a href="/globe"><img class="h-[15px] w-[15px]" src={closeIcon} /></a>
							</div>
						{/if}

						<!-- Form -->
						<form on:submit|preventDefault={handleSubmit}>
							<section>
								<div class="flex flex-col relative mt-[-80px]">
									<div class="shadow" />
									{#if formData.type_id}
										<div class="absolute top-[0px] left-[0px]">
											<DestinationTypeSelector
												activeTypeId={formData.type_id}
												onSelect={type => {
													formData.type_id = type.id;
													handleSubmit(Fields.type_id);
												}}
											/>
										</div>
									{/if}
									<textarea
										name="name"
										rows="1"
										spellcheck={false}
										disabled={isGallery}
										class="text-3xl bg-transparent font-semibold z-40"
										bind:value={formData.name}
										on:blur={() => handleSubmit(Fields.name)}
									/>
								</div>
								{#if destination.coordinates}
									<Coordinates disabled={isGallery} {lat} {lng} />
								{/if}
								<Textarea
									name="description"
									bind:value={formData.description}
									disabled={isGallery}
									onBlur={() => handleSubmit(Fields.description)}
									placeholder="Enter a description..."
								/>
							</section>
						</form>
					{/if}
					<!-- <Waypoints {map} waypoints={destination.waypoints} /> -->
				</div>
			</DisplayCard>
		</main>
	{/if}
	<slot slot="content" />
	<!-- {#if destination.waypoints}
		<WaypointMarkers waypoints={destination.waypoints} />
	{/if} -->
</GlobePageLayout>

<style lang="scss">
	main {
		position: relative;
		max-height: calc(100vh - 80px);
		overflow: visible;
		width: auto;
		display: flex;
		flex-flow: column nowrap;

		&:hover .image-wrapper {
			animation: barberpole 22s linear infinite;
		}

		&:hover {
			.hasImage img {
				opacity: 0.9;
			}
		}
	}

	.fly-to button {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 100;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		@apply justify-center items-center;

		&:hover {
			@apply bg-black;
		}
	}

	.control-button {
		a,
		button {
			@apply rounded-full flex opacity-0 
				group-hover:opacity-100 align-middle 
				items-center justify-center;
			height: 50px;
			width: 50px;
			transition: all ease 0.33s;

			&:hover {
				@apply bg-black;
			}
		}
	}

	form {
		@apply w-full;
	}

	h3 {
		@apply p-6 border-t-2 border-stone-800;
	}

	[name='name'] {
		@apply rounded-md ml-[75px];
		padding: 10px 0px 6px 0px;
		border: solid 2px transparent;
		transition: all ease 0.2s;
		resize: none;
		overflow: hidden; /* Hide any overflowing content */
		text-overflow: ellipsis; /* Add an ellipsis when text overflows */
		white-space: nowrap; /* Prevent text from wrapping to a new line */
		width: calc(100% - 90px);

		&:focus:not([disabled]),
		&:hover:not([disabled]) {
			padding: 6px;
			padding-left: 10px;
		}
		&:focus:not([disabled]) {
			background: rgba(255, 255, 255, 0.1111);
			border: solid 2px rgba(222, 222, 222, 0.222);
		}
		&:focus-visible {
			@apply outline-0;
		}
	}

	.root img {
		transition: all ease 0.2s;
	}

	.image-wrapper {
		@apply sticky top-0 pt-[120px] h-[155px] w-full rounded-t-lg;
		transition: all ease 0.3s;
		background: repeating-linear-gradient(120deg, #000, #000 11px, #555 11px, #555 12px);
		background-size: 200%;
		overflow: hidden;
		display: block;

		&.hasImage {
			// @apply pt-[180px] h-[180px];
			background: none;
			& > img {
				opacity: 0.69;
			}
		}

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
		@apply absolute opacity-90 
		w-full h-full
		object-center
		top-0 left-0 z-0 object-cover;
	}

	section {
		@apply relative;
	}

	.shadow {
		@apply w-full absolute top-0 left-0 z-0;
		background-image: linear-gradient(0deg, #000 70%, rgba(0, 0, 0, 0));
		height: calc(100% + 50px);
	}

	/* View Gallery */
	.view-gallery {
		@apply absolute top-1/2 left-1/2 text-sm
            -mt-[30px] py-2 px-4 rounded-md
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

	@media (max-width: 700px) {
		main {
			@apply max-w-full w-[98%] ml-1;
		}
	}
</style>
