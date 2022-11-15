<script lang="ts">
	import { page } from '$app/stores';
	import Account from '@routes/auth/Account.svelte';
	import LoginForm from '@routes/auth/LoginForm.svelte';
	let GLOBE_WALLPAPER =
		'https://uxjcnbzonuzmknqsevlh.supabase.co/storage/v1/object/sign/wallpapers/globe?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3YWxscGFwZXJzL2dsb2JlIiwiaWF0IjoxNjY4NDU4OTk4LCJleHAiOjE5ODM4MTg5OTh9.5yPRn_DBMraNvUSelgcknozxZ6cmS9dBVWnyNkHvUm4';
	$: session = $page.data.session;
</script>

<main>
	<div class="wrapper">
		<!-- {#if session}
			<header>
				<h1>🌎 Welcome to Wannago.</h1>
				<h3 class="opacity-50">We live in a beautiful World. Document yours.</h3>
			</header>
		{/if} -->
		<div class="bg" />
		<section>
			{#if !$page.data.session}
				<LoginForm />
				<div
					id="product-information"
					class="absolute top-0 right-0 w-[444px] h-full opacity-90 bg-slate-900"
				>
					<h2 class="text-3xl opacity-80">Create Destinations</h2>
					<img
						class="w-[100px]"
						src="https://uxjcnbzonuzmknqsevlh.supabase.co/storage/v1/object/sign/marketing/destination-marker.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtYXJrZXRpbmcvZGVzdGluYXRpb24tbWFya2VyLnBuZyIsImlhdCI6MTY2ODQ5MzIyNiwiZXhwIjoxOTgzODUzMjI2fQ.pxXlAiw6L26h9Kt9Mb7H8MpPgqPQSNBCFC3cEsx4hiI"
					/>

					<h2 class="text-3xl opacity-80">Upload Photos</h2>
					<h2 class="text-3xl opacity-80">Document your experience</h2>
				</div>
			{:else}
				<a
					href="/globe"
					class="
					relative
					overflow-hidden
					p-9 row-span-1 col-span-6 
					md:col-span-3 lg:col-span-2 
					rounded-2xl pb-[77px]
				  border-stone-800 border-2
				  hover:border-gray-600
			"
				>
					<div class="gradient" />
					<img src={GLOBE_WALLPAPER} />
					<span class="text-4xl absolute bottom-8 left-8">View Globe</span>
				</a>
				<Account session={$page.data.session} />
			{/if}
		</section>
	</div>
</main>
k

<style>
	main {
		@apply absolute top-0 left-0
		w-full h-full
		z-50;
	}

	.bg {
		@apply bg-black opacity-80
		absolute top-0 left-0
		w-full h-full
		z-0;
	}

	.wrapper {
		max-width: 100%;
		width: 1248px;
		margin: 50px auto 0;
		padding: 0 66px;
	}

	section {
		@apply grid grid-cols-6
		gap-6
		mt-12
    	grid-rows-3;
	}

	header {
		@apply mb-4;
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
</style>
