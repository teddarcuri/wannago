<script>
	import ButtonPill from '@/lib/components/ButtonPill.svelte';
	import Textarea from '@/lib/components/Textarea.svelte';
	import auth from '@/lib/stores/auth';
	import { supabaseClient } from '$lib/db';
	import { onMount } from 'svelte';
	import LoadingOverlay from '@/lib/components/LoadingOverlay.svelte';

	let feedback = '';
	let selected = [];
	let loading = true;
	let formCompleted = false;

	const FORM_TITLE = 'MVP Feedback';

	const options = [
		'More Destination Types',
		'Destination filtering/sorting',
		'Sub Destinations + Waypoints',
		'Image + Video Gallery',
		'A.I Trip Planner',
		'Strava Integration',
		'GPS import + export',
		'Trip Sharing + Social Features',
		'Trip Journaling/Diary/Logs',
		'Directions',
		'Improved search',
	];

	onMount(async () => {
		const { data, error } = await supabaseClient
			.from('form_submissions')
			.select('*')
			.eq('user_id', $auth.user.id)
			.eq('form_title', FORM_TITLE);

		if (data.length) {
			formCompleted = true;
		}

		if (error) {
			console.log('ERROR: ', error);
		}

		loading = false;
	});

	const handleSubmit = async () => {
		const user_id = $auth.user.id;

		loading = true;
		const { data, error } = await supabaseClient.from('form_submissions').insert({
			form_title: FORM_TITLE,
			form_data: {
				selected,
				feedback,
			},
			user_id,
		});

		if (error) {
			console.log('ERORRR BRUH: ', error);
		}

		setTimeout(() => {
			formCompleted = true;
			loading = false;
		}, 1000);
	};
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="relative bg-black rounded-md overflow-auto p-[33px]"
>
	{#if loading}
		<LoadingOverlay />
	{/if}

	{#if formCompleted}
		<div
			class="absolute top-0 left-0 w-full h-full bg-black z-50 grid place-items-center"
		>
			<div class="flex flex-col text-center">
				<p class="text-xl">🤍 🌎 Thank you for leaving feedback!</p>
				<p class="opacity-50">You can reach me at tedd.arcuri@gmail.com with any else!</p>
			</div>
		</div>
	{/if}
	<h2 class="text-xl text-stone-300 mb-4">
		<span class="mr-2">🌎</span> How would <b>you</b> like to use wannago?
	</h2>
	<p class="opacity-70 my-2 mb-4 font-semibold">
		We are just getting started making wannago a robust place for you to
		<i> document your world</i>. While we figure out what direction to take the platform,
		we'd love to know what types of features would be most useful to you:
	</p>

	{#each options as option}
		{@const isSelected = selected.includes(option)}
		<button
			class:active={isSelected}
			on:click|preventDefault={() => {
				if (isSelected) {
					selected = selected.filter(item => item !== option);
				} else {
					selected = [...selected, option];
				}
			}}
			class="inline-flex items-center justify-center 
            p-4 border border-[#333] bg-[#111] hover:bg-[#333] 
            rounded-md text-[11px] text-stone-100 text-opacity-50 uppercase font-semibold
            tracking-widest mr-2 mb-2 p-2 transition-all ease-in-out
            duration-200 hover:text-opacity-100"
		>
			{option}
		</button>
	{/each}

	<div class="feedback border my-2 border-stone-700">
		<Textarea
			placeholder="What else would you find useful?"
			name="feedback"
			bind:value={feedback}
		/>
	</div>

	<div class="flex justify-end mt-4">
		<ButtonPill disabled={!feedback && !selected.length}>Submit feedback</ButtonPill>
	</div>
</form>

<style lang="scss">
	.feedback {
		@apply rounded-md overflow-hidden;
		input {
			@apply w-full h-[44px] px-4 bg-black;
		}
	}

	.active {
		@apply bg-emerald-700 text-stone-200;
	}
</style>
