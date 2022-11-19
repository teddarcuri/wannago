<script lang="ts">
	import getLatLngDisplayText from '$lib/util/getLatLngDisplayText';
	import DisplayCard from '../../components/DisplayCard.svelte';
	import focusIcon from '$lib/img/focus.svg';
	import closeIcon from '$lib/img/close.svg';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '@/lib/stores/activeInfoDisplay';
	import { supabaseClient } from '@/lib/db';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';
	import { navigating } from '$app/stores';
	import { writable } from 'svelte/store';
	enum DefaultWallpapers {
		Aurora = 'https://imgs.search.brave.com/mAiiqzY80x4U-OWobUWXLBfbnUxZxrCIHw1bl2BwZHM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd3d3LnRv/cDEwbGlmZXN0eWxl/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMTEvYXJ0/LWFzdHJvbm9teS1h/dG1vc3BoZXJlLTM2/MDkxMi5qcGc',
		Aurora2 = 'https://imgs.search.brave.com/p2zJuYYCh4C1A1AzA3X-2Hau0EGvZMs_otpycAiHAaE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvMmtuMDlq/ajNwNW41MS5qcGc',
		Sunset = 'https://imgs.search.brave.com/sQkT26CFbrcRgWamq9NmY2jCeyviP6LJF0MDJmvSlfI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9qb29p/bm4uY29tL2ltYWdl/cy9nZXJtYW4tbW91/bnRhaW5zLTIuanBn',
		Pikes = 'https://imgs.search.brave.com/y7NUhuWFCMB9mSw8IF6cQ0et9dUWnJpYoVDM_2fAJy0/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LmFz/cGhhbHRhbmRydWJi/ZXIuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzA1L2t0/bS1waWtlcy1wZWFr/LWNocmlzLWZpbGxt/b3JlLXNjYWxlZC5q/cGc_Zml0PTI1NjAl/MkMxNzA3JnNzbD0x'
	}

	export let data;

	let loading = false;
	let form = writable({ name: '', description: '' }); // there has to be a better way.
	$: destination = data?.destination;
	$: lat = destination?.coordinates.coordinates[1];
	$: lng = destination?.coordinates.coordinates[0];
	$: promptUnsavedChanges = false;

	const handleSubmit = async (e) => {
		console.log($form.name);
		loading = true;
		activeInfoDisplayStore.update((s) => ({
			status: ActiveInfoDisplayStatus.Action,
			displayText: 'Saving...'
		}));

		// TODO: Figure out a way to prevent the need
		// to do use this OR logic here. This is a result
		// of not having proper data binding on our form element
		// The inputs are initialzied with Or logic, instead of
		// the value they are bound to being the one that contains
		// the or operator...

		const updates = {
			...destination,
			name: $form.name || destination.name,
			description: $form.description || destination.description
		};
		// I was also forced to do an upsert here. We should find out why and change it if possible
		const { error, data } = await supabaseClient.from('destinations').upsert(updates);

		setTimeout(() => {
			loading = false;

			if (error) {
				activeInfoDisplayStore.update((s) => ({
					status: ActiveInfoDisplayStatus.Error,
					displayText: 'Something went wrong'
				}));
				return;
			}

			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Success,
				displayText: 'Destination saved.'
			}));
		}, 900);

		setTimeout(() => {
			activeInfoDisplayStore.update((s) => ({
				status: ActiveInfoDisplayStatus.Normal,
				displayText: ''
			}));
		}, 2200);

		console.log({
			error,
			data
		});
	};

	$: console.log(destination);
</script>

<DisplayCard>
	<div class="root bg-stone-900 w-[425px] h-full rounded-lg">
		{#if loading || $navigating || Boolean(!destination)}
			<LoadingOverlay />
		{/if}

		{#if Boolean(destination)}
			<!-- Cover Photo -->
			<div class="image-wrapper">
				<img class="cover" src={DefaultWallpapers.Aurora2} />
			</div>
			<!-- Buttons/Controls -->
			<div class="controls absolute flex top-2 left-2 z-30">
				<a href="/globe"><img class="h-[13px] w-[13px]" src={closeIcon} /></a>
			</div>
			<!-- <div class="controls absolute flex top-2 right-2 z-30">
		<button><img class="h-[24px] w-[24px]" src={focusIcon} /></button>
		</div> -->
			<form on:submit|preventDefault={handleSubmit}>
				<!-- Form -->
				<section>
					<div>
						<input
							name="name"
							class="text-3xl bg-transparent font-semibold"
							value={$form.name || destination.name}
							on:input={(e) => form.update((s) => ({ ...s, name: e.target.value }))}
						/>
						{#if destination.coordinates}
							<p>
								{getLatLngDisplayText(lat, lng)}
							</p>
						{/if}
					</div>

					<textarea
						name="description"
						value={$form.description || destination.description}
						on:input={(e) => form.update((s) => ({ ...s, description: e.target.value }))}
						placeholder="Describe this place..."
					/>
				</section>
				<!-- UNSAVED CHANGES -->
				{#if true || promptUnsavedChanges}
					<div class="unsaved-changes">
						<span class="text-sm mt-[11px] text-zinc-400">Revert Changes</span>
						<div class="flex p-2 ml-4 rounded-md">
							<button on:click|preventDefault={handleSubmit}>Save Changes</button>
						</div>
					</div>
				{/if}
			</form>
		{/if}
	</div>
</DisplayCard>

<style>
	form {
		@apply w-full;
	}
	textarea {
		transition: padding ease 0.2s;
		@apply bg-stone-900
		 w-full 
		 p-8
		 border-2
		 border-transparent
		 text-stone-300
		 mt-2;
	}

	input:focus-visible {
		@apply outline-0;
	}

	textarea:focus-visible {
		@apply outline-0 p-10;
	}

	.controls a,
	.controls button {
		@apply rounded-full flex align-middle items-center justify-center;
		height: 44px;
		width: 44px;
	}

	.root img {
		transition: all ease 0.2s;
	}

	.image-wrapper {
		@apply pt-[170px];
		overflow: hidden;
		position: relative;
		background-image: linear-gradient(0deg, #000, rgba(0, 0, 0, 0));
	}

	.image-wrapper:hover img {
		transform: scale(1.1);
		opacity: 69%;
	}

	.cover {
		@apply absolute opacity-40 
		w-full h-full
		object-center
		top-0 left-0 z-0 object-cover;
	}

	button {
		background: none;
		padding: 0;
	}

	a:hover,
	button:hover {
		@apply bg-stone-800;
	}

	section {
		@apply relative;
	}

	section div:first-child {
		@apply px-8;
		margin-top: -55px;
		background-image: linear-gradient(0deg, #1b1917 20%, rgba(0, 0, 0, 0));
	}

	.unsaved-changes {
		@apply absolute top-full left-1/2 
		 mx-auto rounded-b-lg flex 
		-translate-x-1/2
		justify-end p-2 px-6 bg-stone-800;
	}
	.unsaved-changes button {
		@apply bg-emerald-800 px-4 h-[36px] whitespace-nowrap text-sm
		hover:bg-emerald-600;
	}

	.unsaved-changes span {
		@apply whitespace-nowrap;
	}
</style>
