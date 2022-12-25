<script>
	import { page } from '$app/stores';
	import MyDestinations from '@/lib/components/Dashboard/MyDestinations.svelte';
	import { globalUIStore } from '@/lib/stores/globalUI';
	$: console.log('PAGE:', $page);
</script>

<!-- 
    So, this is a bit hacky
    Basically, I need to force the layout to re-render
    when the destination changes (i.e. cache invlidated). 
    This is because the values in the destination Display card are two way bound
    to what comes from the PageData prop. Therefore, these
    props (name, descrtiption, etc) are not reactive. Thus 
    we need to force the layout to re-render. 

    This could cause issues? TBD. If issues arise, look here.
-->
<!-- {#key $page.data.destination.id} -->
<div class="root flex w-full h-full">
	<div class="pt-[50px] pl-[15px]">
		<slot />
	</div>
	<div class="flex-1">
		<slot name="content" />
	</div>
</div>

<!-- {/key} -->
<style lang="scss">
	.root {
		pointer-events: none;
		flex-flow: row nowrap;
		align-items: flex-start;
		flex: 1 1 100%;

		& > * {
			pointer-events: auto;
		}
	}
</style>
