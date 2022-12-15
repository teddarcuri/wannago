<script>
	import { afterNavigate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';

	// write an onMount function that alerts the user this page is here
	onMount(
		() => {
			console.log('Destination page is here');
		},
		// write an onDestroy function that alerts the user this page is gone
	);

	onDestroy(() => {
		// write a function that alerts the user this page is gone

		console.log('Destination page is gone');
	});

	afterNavigate(() => {
		console.log('After navigate - destination page');
		// // Textarea autogrow
		// const tx = document.getElementsByTagName('textarea');
		// for (let i = 0; i < tx.length; i++) {
		// 	tx[i].setAttribute(
		// 		'style',
		// 		'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;',
		// 	);
		// 	tx[i].addEventListener('input', onInput, false);
		// 	tx[i].addEventListener('focus', onInput, false);
		// 	onInput.call(tx[i]); // force this happen everytime a new destination is loaded
		// }
		//
		// function onInput() {
		// 	this.style.height = 0;
		// 	this.style.height = this.scrollHeight + 'px';
		// }
	});
</script>
