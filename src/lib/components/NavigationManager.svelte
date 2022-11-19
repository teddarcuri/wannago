<script lang="ts">
	import { page, navigating } from '$app/stores';
	import ProgressBar from 'svelte-progress-bar';
	import { ActiveInfoDisplayStatus, activeInfoDisplayStore } from '../stores/activeInfoDisplay';

	let progress: ProgressBar;

	$: {
		if ($navigating) {
			const {
				to: {
					routeId,
					params: { slug }
				}
			} = $navigating;

			if (progress) progress.start();
		}

		if (!$navigating) {
			if (progress) progress.complete();
		}
	}
</script>

<ProgressBar bind:this={progress} />
