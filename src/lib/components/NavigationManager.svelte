<script lang="ts">
	import { navigating } from '$app/stores';
	import ProgressBar from 'svelte-progress-bar';
	import { activeDestinationStore } from '../stores/activeDestination';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '../stores/activeInfoDisplay';
	let progress: ProgressBar;

	$: {
		if ($navigating) {
			const { from } = $navigating;
			// progress bar kick off
			if (progress) progress.start();
			// Turn off edit location mode if on
			if (
				from.routeId === '/globe/destinations/[id]' &&
				$activeDestinationStore.editLocationMode
			) {
				activeDestinationStore.update(s => ({ ...s, editLocationMode: false }));
				activeInfoDisplayStore.update(() => ({
					status: ActiveInfoDisplayStatus.Normal,
					displayText: '',
				}));
			}
		}

		if (!$navigating) {
			// progress bar end
			if (progress) progress.complete();
		}
	}
</script>

<ProgressBar bind:this={progress} />
