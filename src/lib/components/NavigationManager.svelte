<script>
	import { page, navigating } from '$app/stores';
	import ProgressBar from 'svelte-progress-bar';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '../stores/activeInfoDisplay';

	let progress;
	$: {
		if ($navigating) {
			const {
				to: {
					routeId,
					params: { slug }
				}
			} = $navigating;

			if (progress) progress.start();
			if (routeId === '/globe/destinations/[slug]') {
				// // View Destination
				// activeInfoDisplayStore.update((s) => ({
				// 	status: ActiveInfoDisplayStatus.Information,
				// 	displayText: 'Viewing Destination:'
				// }));
			}

			if (routeId === '/globe') {
				// Globe Page
				console.log('NAVIGATED TO GLOBE PAGE');
			}
		}

		if (!$navigating) {
			if (progress) progress.complete();
		}
	}
</script>

<ProgressBar bind:this={progress} />
