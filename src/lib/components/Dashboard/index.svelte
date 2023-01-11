<script lang="ts">
	import { page } from '$app/stores';
	import Account from '@/lib/components/Account/Details.svelte';
	import LoginForm from '$lib/components/Account/LoginForm.svelte';
	import GlobeTile from './GlobeTile.svelte';
	import MyDestinations from './DestinationList.svelte';
	import GettingStarted from '@/routes/globe/components/GettingStarted.svelte';
	import { fly } from 'svelte/transition';
	import DevelopmentBanner from '../DevelopmentBanner.svelte';
	$: session = $page.data.session;
</script>

<main>
	<div class="bg" />
	{#if !$page.data.session}
		<div class="absolute h-full w-full grid place-items-center">
			<LoginForm />
		</div>
	{:else}
		<div class="wrapper">
			<DevelopmentBanner />

			<section class="w-full pt-5">
				<div class="item-1 p-4 pt-0">
					<GlobeTile />
				</div>
				<div class="item-2 p-4 pt-0">
					<div in:fly={{ x: 50, y: 0, delay: 444, duration: 555 }}>
						<!-- <GettingStarted /> -->
						<MyDestinations />
					</div>
				</div>
				<div class="item-3 p-4">
					<Account session={$page.data.session} />
				</div>
			</section>
		</div>
	{/if}
</main>

<style style="scss">
	section {
		@apply mt-4;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, 1fr);
		width: 100%;
		height: calc(100vh - 170px);
		min-height: 600px;
	}

	.item-1 {
		grid-area: 1 / 1 / 3 / 4;
		display: flex;
	}

	.item-2 {
		grid-area: 1 / 4 / 4 / 6;
		overflow: auto;
	}

	.item-3 {
		grid-area: 3 / 1 / 3 / 4;
	}

	@media (max-width: 800px) {
		section {
			display: flex;
			flex-flow: column;
			overflow: auto;
			height: auto;
		}
		.item-1 {
			height: 300px;
		}

		.item-2 {
			overflow: none;
			height: auto;
		}
	}

	main {
		@apply absolute top-0 left-0
		w-full h-full
		overflow-auto
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
		margin: 20px auto 0;
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

	@media (max-width: 768px) {
		.wrapper {
			padding: 0px;
		}
	}
</style>
