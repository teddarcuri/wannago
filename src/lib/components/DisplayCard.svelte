<div>
	<slot />
</div>

<style>
	div {
		user-select: none;
		transition: all ease 0.3s;
		max-height: calc(100vh - 155px);
		box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
		@apply overflow-visible bg-black flex 
                text-gray-200 rounded-lg  relative
               w-[380px] min-h-[20px] z-50;
	}

	@media (max-width: 700px) {
		div {
			@apply rounded-t-2xl;
			width: 100%;
			max-height: 100%;
		}
	}
</style>
