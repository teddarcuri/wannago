<script lang="ts">
	import { navigating } from '$app/stores';
	import ProgressBar from 'svelte-progress-bar';
	import { activeDestinationStore } from '../stores/activeDestination';
	import {
		ActiveInfoDisplayStatus,
		activeInfoDisplayStore,
	} from '../stores/activeInfoDisplay';
	import { addWaypointStore } from '../stores/addWaypoint';
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
			// Clear any new location
			if (
				from.routeId === '/globe/destinations/[id]' &&
				$activeDestinationStore.newLocation
			) {
				activeDestinationStore.update(s => ({ ...s, newLocation: null }));
			}

			// Clear add waypoint active
			if (from.routeId === '/globe/destinations/[id]' && $addWaypointStore.active) {
				addWaypointStore.update(s => ({ ...s, active: false }));
				activeInfoDisplayStore.update(() => ({
					status: ActiveInfoDisplayStatus.Normal,
					displayText: '',
				}));
			}

			// turn off active desitnation delete mode
			if (
				from.routeId === '/globe/destinations/[id]' &&
				$activeDestinationStore.deleteMode
			) {
				activeDestinationStore.update(s => ({ ...s, deleteMode: false }));
			}
		}

		if (!$navigating) {
			// progress bar end
			if (progress) progress.complete();
		}
	}
</script>

<ProgressBar bind:this={progress} />
