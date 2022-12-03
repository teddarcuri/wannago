<div>
	<slot />
</div>

<style>
	div {
		transition: all ease 0.3s;
		box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
		@apply absolute top-[50px]
                text-gray-200 rounded-md left-[15px]
                min-w-[309px] min-h-[250px] z-50;
	}
</style>
