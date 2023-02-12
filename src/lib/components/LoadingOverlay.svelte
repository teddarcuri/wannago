<script>
	import spinner from '$lib/img/spinner.svg';
</script>

<div>
	<img class="loading-spinner" src={spinner} />
</div>

<style>
	div {
		@apply bg-black top-0 left-0 rounded-lg w-full h-full absolute
        grid place-items-center;
		z-index: 999;
	}

	img {
		transform: rotate(var(--angle));
		animation: 1.69s rotate cubic-bezier(0.84, 0.16, 0.39, 1.2) infinite;
	}
</style>
