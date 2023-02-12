<script lang="ts">
	import Account from '$lib/features/Account/Details.svelte';
	import GlobeTile from './GlobeTile.svelte';
	import MyDestinations from './DestinationList.svelte';
	import { fly } from 'svelte/transition';
	import FeedbackForm from './FeedbackForm.svelte';
</script>

<main>
	<div class="bg" />
	<div class="wrapper h-full flex">
		<section class="w-full h-full">
			<div class="content h-full flex-shrink-0 flex-grow overflow-auto p-8 relative">
				<GlobeTile />
				<MyDestinations />
			</div>

			<div class="sidebar overflow-auto p-8 pt-[30px]">
				<div in:fly={{ x: 50, y: 0, delay: 444, duration: 555 }}>
					<FeedbackForm />
					<Account />
				</div>
			</div>
		</section>
	</div>
</main>

<style style="scss">
	.content {
		max-width: 680px;
	}

	.sidebar {
		@apply w-[555px] flex-shrink-0 flex-grow-0;
	}

	section {
		@apply flex overflow-hidden;
		width: 100%;
	}

	@media (max-width: 900px) {
		.sidebar {
			display: none;
		}
		.content {
			width: 100%;
		}
	}

	main {
		@apply absolute top-0 left-0
		w-full h-full
		overflow-hidden
		z-50;
	}

	.bg {
		@apply bg-black opacity-80
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

	@media (max-width: 768px) {
		.wrapper {
			padding: 0px;
		}
	}
</style>
