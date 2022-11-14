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
		{#if session}
			<header>
				<h1>🌎 Welcome</h1>
				<!-- <h3>We live in a beautiful World. Document yours.</h3> -->
			</header>
		{/if}
		<section>
			{#if !$page.data.session}
				<LoginForm />
			{:else}
				<a
					href="/globe"
					class="
					relative
					overflow-hidden
					p-9 row-span-1 col-span-6 
					md:col-span-3 lg:col-span-2 
					bg-gray-900 
					rounded-lg pb-[77px]
				  border-gray-800 border-4
			"
				>
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
		@apply bg-black
		absolute top-0 left-0
		w-full h-full
		opacity-90
		z-50;
	}

	.wrapper {
		max-width: 100%;
		width: 1248px;
		margin: 50px auto 0;
		padding: 0 40px;
	}

	section {
		@apply grid grid-cols-6
		gap-2
    	grid-rows-3;
	}

	header {
		@apply mb-4;
		max-width: 1200px;
	}

	h1 {
		@apply text-3xl py-6;
		align-self: flex-start;
	}

	h3 {
		@apply text-xl;
	}

	a img {
		transform: scale(1.1);
		@apply absolute top-0 left-0 opacity-40 h-full w-full object-cover;
	}
</style>
