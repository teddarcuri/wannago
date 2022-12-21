<script>
	import { page } from '$app/stores';
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
{#key $page.data}
	<slot />
{/key}
