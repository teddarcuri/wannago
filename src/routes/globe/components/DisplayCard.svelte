<div>
	<slot />
</div>

<style>
	div {
		user-select: none;
		transition: all ease 0.3s;
		max-height: calc(100vh - 190px);
		box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
		@apply absolute overflow-auto bg-black flex top-0
                text-gray-200 rounded-md left-[15px]
               w-[400px] min-h-[250px] z-50;
	}
</style>
