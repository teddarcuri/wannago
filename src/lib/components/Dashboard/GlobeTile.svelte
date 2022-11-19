<a href="/globe">
	<div class="gradient" />
	<img
		src="https://uxjcnbzonuzmknqsevlh.supabase.co/storage/v1/object/sign/wallpapers/globe%201-min.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3YWxscGFwZXJzL2dsb2JlIDEtbWluLnBuZyIsImlhdCI6MTY2ODgzMzg4NCwiZXhwIjoxOTg0MTkzODg0fQ.rKwkKk8dh7h43nRR5eXzjBcgTMwx8YVJ2vdQuXlHzpw"
	/>
	<span class="text-4xl absolute bottom-8 left-8">View Globe</span>
</a>

<style>
	.gradient {
		background-image: linear-gradient(0deg, rgb(5, 4, 4) 12%, transparent);
		height: 360px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	a span {
		z-index: 5;
	}

	a {
		@apply relative
		overflow-hidden
		p-9 row-span-1 col-span-6 
		md:col-span-3 lg:col-span-3 
		rounded-2xl
		mb-8
		h-[369px]
		border-stone-800 border-2
		hover:border-gray-600;
		transition: border 0.4s ease;
	}

	a:active {
		transition: border 0.2s ease;
		@apply border-gray-700 border-[9px];
	}

	a:hover img {
		@apply opacity-100;
		transform: scale(1.05);
	}

	a img {
		transform: scale(1);
		transition: all ease 0.6s;
		@apply absolute top-0 left-0 opacity-50 h-full w-full object-cover;
	}
</style>
