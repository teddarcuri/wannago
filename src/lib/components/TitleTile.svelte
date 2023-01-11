<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import VanillaTilt from 'vanilla-tilt';

	export let link;
	export let title;
	export let img;
	export let maxTilt = 3;

	onMount(() => {
		VanillaTilt.init(document.querySelector('.tilt-tile'), {
			max: maxTilt,
			speed: 600,
		});
	});
</script>

<a
	class:noImage={!img}
	data-tilt
	data-tilt-max={maxTilt}
	in:fly={{ delay: 222, duration: 1222 }}
	href={link}
>
	<div class="gradient" />
	{#if img}
		<img src={img} />
	{/if}
	<span class="text-4xl absolute bottom-8 left-8">{title}</span>
</a>

<style lang="scss">
	.gradient {
		background-image: linear-gradient(0deg, rgb(5, 4, 4) 12%, transparent);
		height: 100%;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	a span {
		z-index: 5;
		transform: translateZ(20px);
	}

	a {
		@apply relative
		overflow-hidden
		p-9 
        block
		rounded-md
		w-full
		h-full;
		box-shadow: 0 0 10px 1px rgba(194, 209, 227, 0.03);
		transition: box-shadow 0.88s ease;
		transform-style: preserve-3d;
		transform: perspective(1000px);

		&.noImage {
			background: repeating-linear-gradient(
				120deg,
				#000,
				#000 11px,
				#333 11px,
				#333 12px
			);
			background-size: 200%;
			overflow: hidden;
			display: block;
		}
	}

	a:hover {
		box-shadow: 0 0 18px 11px rgba(194, 209, 227, 0.09);
	}

	a:active {
		transition: all 0.2s ease;
	}

	a:hover img {
		@apply opacity-100;
		transform: scale(1.05);
	}

	a img {
		/* transform: scale(1) translateZ(20px); */
		transition: all ease 0.6s;

		@apply absolute top-0 left-0 opacity-50 h-full w-full object-cover;
	}
</style>
