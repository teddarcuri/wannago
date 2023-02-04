<script lang="ts">
	import { page } from '$app/stores';
	import Account from '$lib/features/Account/Details.svelte';
	import LoginForm from '$lib/features/Account/LoginForm.svelte';
	import GlobeTile from './GlobeTile.svelte';
	import MyDestinations from './DestinationList.svelte';
	import GettingStarted from '@/routes/globe/components/GettingStarted.svelte';
	import { fly } from 'svelte/transition';
	import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
	import { userDestinationsStore } from '@/lib/stores/userDestinations';
	import Textarea from '$lib/components/Textarea.svelte';
	import ButtonPill from '$lib/components/ButtonPill.svelte';
	$: session = $page.data.session;
</script>

<main>
	<div class="bg" />
	{#if !$page.data.session}
		<div class="absolute h-full w-full grid place-items-center">
			<LoginForm />
		</div>
	{:else}
		<div class="wrapper h-full flex">
			<!-- <DevelopmentBanner /> -->
			<section class="w-full h-full">
				<div class="w-[669px] h-full flex-shrink-0 flex-grow overflow-auto p-8  relative">
					<GlobeTile />
					<MyDestinations />
				</div>

				<div class="p-8 pt-[30px]">
					<div in:fly={{ x: 50, y: 0, delay: 444, duration: 555 }}>
						<!-- <GettingStarted /> -->
						<!-- <MyDestinations /> -->

						<form class="bg-black rounded-md overflow-auto p-[33px]">
							<h2 class="text-xl text-stone-300 mb-8">
								<span class="mr-2">🌎</span> How would <b>you</b> like to use wannago?
							</h2>
							<p class="px-3 mb-8  text-stone-400">
								Thanks for using Wannago. You are one of the first. There's a lot of
								places
							</p>
							<!-- <h4 class="text-xl my-5 font-semibold">Some things on the roadmap:</h4>
						<ul>
							<li>
								More destination types (icons) - let us know what you'd like to see!
							</li>
							<li>Full photo gallery</li>
							<li>Directions</li>
							<li>Trip planner</li>
							<li>Trip Journal</li>
						</ul>
						<p class="mt-6">
							In 2023, we have a lot of apps. Arguably too many. Our focus is to serve
							outdoor enthusiasts to plan and document all the places they've been and all
							the places they wannago. We have ideas, but that could look like a lot of
							things - <span
								>Take a minute to let us know what would be useful to you!</span
							>
						</p> -->
							<!-- <h4 class="text-xl my-5 font-semibold">Tell us what you want to see.</h4> -->

							<div class="feedback">
								<textarea placeholder="Leave us some feedback." name="feedback" />
							</div>

							<div class="flex justify-end mt-4">
								<ButtonPill>Submit feedback</ButtonPill>
							</div>
						</form>
						<!-- <div class="flex flex-col items-center">
							<p>
								You have
								<span class="text-2xl mx-2">
									{$userDestinationsStore.destinations.length}
								</span>
								<span>Destinations</span>
							</p>

							<br />
							<p>
								<span class="text-2xl mx-2"> 15 </span>
								<span>of them are campsites</span>
							</p>
						</div> -->
						<Account session={$page.data.session} />
					</div>
				</div>
			</section>
		</div>
	{/if}
</main>

<style style="scss">
	section {
		@apply flex overflow-hidden;
		width: 100%;
		/* max-height: calc(100vh - 170px); */
	}

	@media (max-width: 800px) {
		/* section {
			display: flex;
			flex-flow: column;
			overflow: auto;
			height: auto;
		} */
	}

	main {
		@apply absolute top-0 left-0
		w-full h-full
		overflow-hidden
		z-50;
	}

	.bg {
		@apply bg-black opacity-90
		fixed top-0 left-0
		w-full h-full
		z-0;
	}

	.wrapper {
		max-width: 100%;
		width: 1248px;
		position: relative;
		overflow: hidden;
		margin: 0 auto;
	}

	header {
		@apply relative z-10 mb-4;
		max-width: 1200px;
	}

	.gradient {
		background-image: linear-gradient(0deg, black, transparent);
		height: 180px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	a span {
		z-index: 5;
	}

	h1 {
		@apply text-3xl py-6;
		align-self: flex-start;
	}

	h3 {
		@apply text-xl;
	}

	a {
		transition: border 0.4s ease;
	}

	a img {
		transform: scale(1.1);
		@apply absolute top-0 left-0 opacity-30 h-full w-full object-cover;
	}

	.feedback textarea {
		@apply border border-slate-800 bg-transparent w-full p-8 rounded-md;
	}

	@media (max-width: 768px) {
		.wrapper {
			padding: 0px;
		}
	}
</style>
